import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "React Component's state or props can't be any";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoAnyWalker(sourceFile, this.getOptions()));
    }
}

const expressionsWithReact = ["React.PureComponent", "React.Component"];
const expressions = ["PureComponent", "Component"];

class NoAnyWalker extends Lint.RuleWalker {
    hasImportedReact = false;

    public visitClassDeclaration(node: ts.ClassDeclaration) {
        node.heritageClauses.forEach(({ types }) => {
            types.forEach(({ expression, typeArguments }) => {
                const expressionText = expression.getText();
                if ( Array.isArray(typeArguments) && typeArguments.length > 1 &&
                    (expressionsWithReact.indexOf(expressionText) !== -1 || (expressions.indexOf(expressionText) !== -1) && this.hasImportedReact)) {
                        if ( (typeArguments[0] && typeArguments[0].kind === ts.SyntaxKind.AnyKeyword) || (typeArguments[1] && typeArguments[1].kind === ts.SyntaxKind.AnyKeyword)) {
                            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                        }
                }
            });
        });
        super.visitClassDeclaration(node);
    }
}