"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const Lint = require("tslint");
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new NoAnyWalker(sourceFile, this.getOptions()));
    }
}
Rule.FAILURE_STRING = "React Component's state or props can't be any";
exports.Rule = Rule;
const expressionsWithReact = ["React.PureComponent", "React.Component"];
const expressions = ["PureComponent", "Component"];
function isAnyKindType(node) {
    return node !== undefined && node !== null && node.kind === ts.SyntaxKind.AnyKeyword;
}
class NoAnyWalker extends Lint.RuleWalker {
    constructor() {
        super(...arguments);
        this.hasImportedReact = false;
    }
    visitImportDeclaration(node) {
        const importModule = node.moduleSpecifier.getText();
        if (importModule === "react") {
            this.hasImportedReact = true;
        }
        super.visitImportDeclaration(node);
    }
    visitClassDeclaration(node) {
        node.heritageClauses.forEach(({ types }) => {
            types.forEach(({ expression, typeArguments }) => {
                const expressionText = expression.getText();
                if (Array.isArray(typeArguments) && typeArguments.length > 1 &&
                    (expressionsWithReact.indexOf(expressionText) !== -1 || (expressions.indexOf(expressionText) !== -1) && this.hasImportedReact)) {
                    if (isAnyKindType(typeArguments[0]) || isAnyKindType(typeArguments[1])) {
                        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                    }
                }
            });
        });
        super.visitClassDeclaration(node);
    }
}
//# sourceMappingURL=componentStateAndPropsNoAnyRule.js.map