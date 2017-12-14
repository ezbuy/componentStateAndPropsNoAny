import * as tslint from 'tslint';
import { lint } from './helper';

const cases = [
    {
        source: `
        class MyComponent extends React.PureComponent<{}, any>{
            render(){
                return null;
            }
        }
        `.trim(),
        error: true
    },
    {
        source: `
        class MyComponent extends React.PureComponent<any, any>{
            render(){
                return null;
            }
        }
        `.trim(),
        error: true
    },,
    {
        source: `
        class MyComponent extends React.PureComponent<any, {}>{
            render(){
                return null;
            }
        }
        `.trim(),
        error: true
    },
    {
        source: `
        class MyComponent extends React.PureComponent<{}, {}>{
            render(){
                return null;
            }
        }
        `.trim(),
        error: false
    },
    {
        source: `
        class MyComponent extends React.PureComponent{
            render(){
                return null;
            }
        }
        `.trim(),
        error: false
    },
    {
        source: `
        import * as React, {Component} from "react";
        class MyComponent extends Component{
            render(){
                return null;
            }
        }
        `.trim(),
        error: false
    }
]



describe('component state and props no any', () => {
    cases.forEach(({source, error}) => {
        it(`check errors`, () => {
            let result: tslint.LintResult = lint(source, ['properties']);
            expect(result.errorCount !== 0).toBe(error, `React Component's state or props can't be any`);
        });
    })
});