# CI/CD Setup: React App to S3 with GitHub Actions

## Overview
  This setup creates a CI/CD pipeline. Code pushed to a GitHub repo is built using npm \
  and deployed to S3 bucket as a static site. 

## Prerequisites
  - AWS Account
  - GitHub repository
  - React Router v7 app

## Steps

### 1. Configure React Router for Static Build
- I am using React Router V7 in Framework mode.
    - I had to disable SSR, because that would require Node to run.

  ### 2. Create and Configure S3 Bucket
  [Bucket creation, static website hosting settings, bucket policy]
  - create a bucket
  - enable static website hosting
  - set default file to: index.html
  - set error file to: index.html
  - create a bucket policy to allow public access
  ```JSON
  {
    "Version": "2012-10-17", # looks like a date but it's a version
    "Statement": [
        {
            "Sid": "PublicReadGetObject", # just a name, not required
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
  }
  ```

  ### 3. Create IAM User for GitHub Actions
  - create a new user (I called mine "github-actions-deploy")
  - on the *Set Permissions* step, select "attach policies directly"
  - ```JSON
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AllowGitHubActionsS3Deploy",
                "Effect": "Allow",
                "Action": [
                    "s3:PutObject",
                    "s3:DeleteObject",
                    "s3:ListBucket"
                ],
                "Resource": [
                    "arn:aws:s3:::YOUR_BUCKET_NAME",
                    "arn:aws:s3:::YOUR_BUCKET_NAME/*"
                ]
            }
        ]
    }
  ```

### 4. Create Access Keys
- IAM > Users > select user > security credentials > create Access Keys
- save the key somewhere until you add them to GitHub

### 5. Add Secrets to GitHub
- go repo in GitHub
- navigate to Settings > security > actions and variable > actions
- create each of the following secrets and paste the appropriate info
  - AWS_ACCESS_KEY_ID
  - AWS_S3_BUCKET
  - AWS_SECRET_ACCESS_KEY

### 6. Create GitHub Actions Workflow
- look at the [deploy.yml](.github/workflows/deploy.yml) file in the project

### 7. Test the Pipeline
- if all went well, pushing to master should run the pipeline

## Troubleshooting
- aws will give you bucket name like: arn:aws:s3:::YOUR-BUCKET-NAME
  - don't add the *arn:aws:s3:::* prefix in GitHub secrets