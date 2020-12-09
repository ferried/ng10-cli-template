/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-12-09 14:31:03
 * @LastEditTime: 2020-12-09 17:40:35
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /ng10-cli-template/projects/yunzai-g2-charts/src/schematics/ng-add/index.ts
 * @LICENSE: Apache-2.0
 */

import {
    apply,
    chain,
    MergeStrategy,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    template,
    Tree,
    url,
} from '@angular-devkit/schematics';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

const main = (options: { url: string, project: string }): Rule => {
    return (tree: Tree, context: SchematicContext) => {
        return chain([
            updatePackageJSON(),
            removeOriginalFiles(),
            addFiles(tree, context, options),
            downLoadAllPackages(context),
        ])
    }
}

const updatePackageJSON = (): Rule => {
    return (tree: Tree) => {
        const deps: NodeDependency[] = [
            { type: NodeDependencyType.Default, version: '4.1.1', name: '@antv/g2' },
            { type: NodeDependencyType.Default, version: '0.0.11', name: 'yunzai-g2-charts' }
        ]
        deps.forEach((d) => {
            addPackageJsonDependency(tree, d)
        })
        return tree
    }
}


const downLoadAllPackages = (_context: SchematicContext): Rule => {
    return (host: Tree) => {
        _context.addTask(new NodePackageInstallTask());
        return host;
    };
}

const removeOriginalFiles = (): Rule => {
    return (tree: Tree) => {
        const workspace = getWorkspace(tree);
        const project = getProjectFromWorkspace(workspace);
        [
            `${project.sourceRoot}/environments/environment.prod.ts`,
            `${project.sourceRoot}/environments/environment.ts`,
            `${project.sourceRoot}/assets/.gitkeep`,
            `${project.sourceRoot}/app/app.module.ts`,
            `${project.sourceRoot}/app/app.component.ts`,
            `${project.sourceRoot}/app/app.component.spec.ts`,
            `${project.sourceRoot}/app/app.component.html`,
            `${project.sourceRoot}/app/app.component.less`,
            `${project.sourceRoot}/app/app-routing.module.ts`,
        ]
            .filter(p => tree.exists(p))
            .forEach(p => tree.delete(p));
        return tree;
    };
}

const addFiles = (_tree: Tree, _context: SchematicContext, options: { url: string, project: string }) => {
    const workspace = getWorkspace(_tree);
    const project = getProjectFromWorkspace(workspace);
    return chain([
        mergeWith(
            apply(url('./files'), [
                template({
                    ...options,
                }),
                move(project.root as string),
            ]),
            MergeStrategy.Overwrite
        )
    ]);
}

export default main;