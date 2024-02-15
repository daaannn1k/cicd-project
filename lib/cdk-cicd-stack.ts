import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './pipeline-stage';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'MyFirstPipeLine', {
      pipelineName: 'MyFirstPipeLine',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('daaannn1k/cicd-project', 'master'),
        commands: [
          'npm ci',
          'npx cdk synth'
        ]
      })
    })

    const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage', {
      stageName: 'test',
    }))
  }
}
