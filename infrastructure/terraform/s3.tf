resource "aws_s3_bucket" "vite_site" {
  bucket = var.bucket_name

  tags = {
    Name = "vite-app"
  }
}

resource "aws_s3_bucket_public_access_block" "vite_site" {
  bucket = aws_s3_bucket.vite_site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}