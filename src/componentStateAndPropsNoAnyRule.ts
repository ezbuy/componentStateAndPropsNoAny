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

function isAnyKindType(node: ts.Node){
    return node !== undefined && node !== null && node.kind === ts.SyntaxKind.AnyKeyword;
}

class NoAnyWalker extends Lint.RuleWalker {
    hasImportedReact = false;

    public visitImportDeclaration(node: ts.ImportDeclaration){
        const importModule = node.moduleSpecifier.getText();
        if (importModule === "react") {
            this.hasImportedReact = true;
        }
        super.visitImportDeclaration(node);
    }

    public visitClassDeclaration(node: ts.ClassDeclaration) {
        node.heritageClauses.forEach(({ types }) => {
            types.forEach(({ expression, typeArguments }) => {
                const expressionText = expression.getText();
                if ( Array.isArray(typeArguments) && typeArguments.length > 1 &&
                    (expressionsWithReact.indexOf(expressionText) !== -1 || (expressions.indexOf(expressionText) !== -1) && this.hasImportedReact)) {
                        if ( isAnyKindType(typeArguments[0]) || isAnyKindType(typeArguments[1]) ) {
                            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                        }
                }
            });
        });
        super.visitClassDeclaration(node);
    }
}