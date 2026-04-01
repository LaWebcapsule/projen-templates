import { FileBase, Project, TextFileOptions } from "projen";


export interface DockerfileProps extends TextFileOptions{

}

export class Dockerfile extends FileBase{

    constructor(scope: Project, filePath: string = "Dockerfile"){
        super(scope, filePath, {
            readonly: true,
            executable: false
        })
    }

    contents: string[]=[]:

    protected synthesizeContent(): string | undefined {
        return this.contents.join("\n")
    }

    from(){

    }

    copy(){

    }


}