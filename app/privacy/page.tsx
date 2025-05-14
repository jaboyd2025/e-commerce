import { Card } from '@/components/ui/card'

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-7xl py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Shipping and billing addresses</li>
                <li>Order history and preferences</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Payment processors for secure transactions</li>
                <li>Shipping partners to deliver your orders</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>File a complaint with supervisory authorities</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We implement appropriate security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage and transmission</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@fashionfrontier.com<br />
                Address: Frostburg State University, 101 Braddock Road, Frostburg, MD 21532
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 