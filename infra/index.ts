import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as path from 'node:path'
import * as fs from 'node:fs'

const config = new pulumi.Config()
const domain = 'axit.jamestindal.co.uk'
const zoneDomain = 'jamestindal.co.uk'

const siteBucket = new aws.s3.Bucket('axit-website-bucket', {
  bucket: domain,
})

const websiteConfig = new aws.s3.BucketWebsiteConfiguration('website-config', {
  bucket: siteBucket.id,
  indexDocument: {
    suffix: 'index.html',
  },
  errorDocument: {
    key: 'index.html',
  },
})

const bucketPolicy = new aws.s3.BucketPolicy('bucket-policy', {
  bucket: siteBucket.id,
  policy: pulumi.jsonStringify({
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'PublicReadGetObject',
        Effect: 'Allow',
        Principal: '*',
        Action: 's3:GetObject',
        Resource: pulumi.interpolate`arn:aws:s3:::${siteBucket.id}/*`,
      },
    ],
  }),
})

const siteDir = path.join(__dirname, '..', 'public')

function getContentType(file: string): string {
  if (file.endsWith('.js')) return 'application/javascript'
  if (file.endsWith('.css')) return 'text/css'
  if (file.endsWith('.map')) return 'application/json'
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) return 'image/jpeg'
  if (file.endsWith('.png')) return 'image/png'
  if (file.endsWith('.html')) return 'text/html'
  return 'application/octet-stream'
}

function walkDir(dir: string, baseDir: string = ''): string[] {
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const relativePath = baseDir ? `${baseDir}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      files.push(...walkDir(path.join(dir, entry.name), relativePath))
    } else {
      files.push(relativePath)
    }
  }
  return files
}

const allFiles = walkDir(siteDir)

const bucketObjects = allFiles.map(file => {
  return new aws.s3.BucketObject(`bucket-object-${file.replace(/[^a-zA-Z0-9]/g, '-')}`, {
    bucket: siteBucket.id,
    key: file,
    source: new pulumi.asset.FileAsset(path.join(siteDir, file)),
    contentType: getContentType(file),
  })
})

const hostedZone = aws.route53.getZoneOutput({
  name: zoneDomain,
})

const record = new aws.route53.Record('axit-record', {
  zoneId: hostedZone.zoneId,
  name: domain,
  type: 'CNAME',
  aliases: [{
    name: websiteConfig.websiteEndpoint,
    zoneId: siteBucket.hostedZoneId,
    evaluateTargetHealth: false,
  }],
})

export const websiteUrl = pulumi.interpolate`http://${websiteConfig.websiteEndpoint}`
export const bucketName = siteBucket.id
export const nameservers = hostedZone.nameServers
