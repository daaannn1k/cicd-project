import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'MyFirstPipeLine', {
      pipelineName: 'MyFirstPipeLine',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('daaannn1k/cicd-project', 'master'),
        commands: [
          'npm ci',
          'npx cdk synth'
        ]
      })
    })
  }
}
