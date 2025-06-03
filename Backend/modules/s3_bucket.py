import boto3
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

def upload_to_s3(file, bucket_name, object_name):
    try:
        s3.upload_fileobj(file, bucket_name, object_name)
        # Customize URL based on bucket and object name
        custom_url = f"https://{bucket_name}.s3.amazonaws.com/{object_name}"
        return custom_url
    except Exception as e:
        print(f"Error uploading to S3: {e}")
        return None