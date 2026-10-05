terraform {
  required_version = ">= 1.10, < 2.0"
  backend "s3" {
    bucket       = "REPLACE_STATE_BUCKET"
    key          = "edf/dev/platform.tfstate"
    region       = "eu-west-2"
    encrypt      = true
    use_lockfile = true
  }
}

# Bootstrap the state bucket separately.
# Enable versioning, block public access and restrict IAM.
# Production uses a separate approved account / key.
# Pin providers and commit .terraform.lock.hcl.
# Inject credentials through the approved role flow.
