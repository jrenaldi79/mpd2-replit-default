import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

function sanitizeFailureMessage(msg: string): string {
  const lines = msg.split('\n');
  const relevantLines = lines.filter(line => 
    !line.includes('at Object.') && 
    !line.includes('at async') &&
    !line.includes('node_modules') &&
    line.trim().length > 0
  ).slice(0, 3);
  return relevantLines.join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const { stdout, stderr } = await execAsync('npm test -- --json --coverage --verbose', {
      maxBuffer: 1024 * 1024 * 10,
      cwd: process.cwd(),
    });

    let testResults;
    try {
      testResults = JSON.parse(stdout);
    } catch (parseError) {
      const jsonMatch = stdout.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        testResults = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse Jest output');
      }
    }

    const coverageData = testResults.coverageMap || null;
    const summary = testResults.numTotalTests ? {
      totalTests: testResults.numTotalTests,
      passedTests: testResults.numPassedTests,
      failedTests: testResults.numFailedTests,
      pendingTests: testResults.numPendingTests,
      success: testResults.success,
    } : null;

    const testSuites = testResults.testResults?.map((suite: any) => ({
      name: suite.name.replace(process.cwd(), ''),
      status: suite.status,
      tests: suite.assertionResults?.map((test: any) => ({
        title: test.title,
        status: test.status,
        failureMessages: test.failureMessages?.map(sanitizeFailureMessage),
      })),
      duration: suite.perfStats?.runtime || 0,
    })) || [];

    let coverage = null;
    if (testResults.coverageMap) {
      const coverageMap = testResults.coverageMap;
      const files = Object.keys(coverageMap);
      
      let totalStatements = 0;
      let coveredStatements = 0;
      let totalBranches = 0;
      let coveredBranches = 0;
      let totalFunctions = 0;
      let coveredFunctions = 0;
      let totalLines = 0;
      let coveredLines = 0;

      files.forEach(file => {
        const fileCoverage = coverageMap[file];
        if (fileCoverage.s) {
          totalStatements += Object.keys(fileCoverage.s).length;
          coveredStatements += Object.values(fileCoverage.s).filter((v: any) => v > 0).length;
        }
        if (fileCoverage.b) {
          const branches = Object.values(fileCoverage.b);
          branches.forEach((branch: any) => {
            if (Array.isArray(branch)) {
              totalBranches += branch.length;
              coveredBranches += branch.filter((v: number) => v > 0).length;
            }
          });
        }
        if (fileCoverage.f) {
          totalFunctions += Object.keys(fileCoverage.f).length;
          coveredFunctions += Object.values(fileCoverage.f).filter((v: any) => v > 0).length;
        }
        if (fileCoverage.statementMap) {
          const lines = Object.values(fileCoverage.statementMap).map((stmt: any) => stmt.start.line);
          const uniqueLines = new Set(lines);
          totalLines += uniqueLines.size;
          
          const executedStatements = Object.keys(fileCoverage.s).filter(
            key => (fileCoverage.s as any)[key] > 0
          );
          const coveredUniqueLines = new Set(
            executedStatements.map(key => (fileCoverage.statementMap as any)[key].start.line)
          );
          coveredLines += coveredUniqueLines.size;
        }
      });

      coverage = {
        lines: totalLines > 0 ? ((coveredLines / totalLines) * 100).toFixed(2) : '0',
        statements: totalStatements > 0 ? ((coveredStatements / totalStatements) * 100).toFixed(2) : '0',
        functions: totalFunctions > 0 ? ((coveredFunctions / totalFunctions) * 100).toFixed(2) : '0',
        branches: totalBranches > 0 ? ((coveredBranches / totalBranches) * 100).toFixed(2) : '0',
      };
    }

    return NextResponse.json({
      success: true,
      summary,
      testSuites,
      coverage,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error';
    const stdout = error.stdout || '';
    const stderr = error.stderr || '';

    let partialResults = null;
    if (stdout) {
      try {
        const jsonMatch = stdout.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          partialResults = JSON.parse(jsonMatch[0]);
        }
      } catch {}
    }

    const sanitizedTestSuites = partialResults?.testResults?.map((suite: any) => ({
      name: suite.name?.replace(process.cwd(), '') || 'Unknown test suite',
      status: suite.status || 'failed',
      tests: suite.assertionResults?.map((test: any) => ({
        title: test.title || 'Unknown test',
        status: test.status || 'failed',
        failureMessages: test.failureMessages?.map(sanitizeFailureMessage) || [],
      })) || [],
      duration: suite.perfStats?.runtime || 0,
    })) || [];

    return NextResponse.json({
      success: false,
      error: errorMessage,
      summary: partialResults ? {
        totalTests: partialResults.numTotalTests || 0,
        passedTests: partialResults.numPassedTests || 0,
        failedTests: partialResults.numFailedTests || 0,
        pendingTests: partialResults.numPendingTests || 0,
        success: false,
      } : null,
      testSuites: sanitizedTestSuites,
    }, { status: 200 });
  }
}
