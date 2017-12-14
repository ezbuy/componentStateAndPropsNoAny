import * as tslint from 'tslint';
import { EMPTY_CONFIG } from 'tslint/lib/configuration';

export function lint(source: string, options: string[]): tslint.LintResult {
    let linterOptions: tslint.ILinterOptions = {
        fix: false,
        formatter: 'json',
        formattersDirectory: undefined,
        rulesDirectory: './dist/src',
    };
    let configuration = EMPTY_CONFIG;
    configuration.rules.set('component-state-and-props-no-any',
        {
            ruleArguments: [true, ...options],
            ruleName: 'component-state-and-props-no-any',
        },
    );
    let linter = new tslint.Linter(linterOptions, undefined);
    linter.lint('File.ts', source, configuration);
    return linter.getResult();
}
