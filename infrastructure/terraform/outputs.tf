output "bucket_name" {
  value = aws_s3_bucket.vite_site.bucket
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.vite_site.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.vite_site.domain_name
}

output "github_actions_role_arn" {
  value = aws_iam_role.github_actions_deploy.arn
}