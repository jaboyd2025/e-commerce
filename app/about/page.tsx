import { Card } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="container max-w-7xl py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are dedicated to providing the best shopping experience for our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              Our mission is to provide high-quality products at competitive prices while ensuring
              exceptional customer service. We believe in making shopping easy, enjoyable, and
              accessible for everyone.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              We envision becoming the leading fashion platform that sets new standards in
              customer satisfaction, product quality, and innovative shopping experiences.
            </p>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We carefully select and curate our products to ensure the highest quality standards.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Customer First</h3>
                <p className="text-muted-foreground">
                  Our customers are at the heart of everything we do. We strive to exceed their
                  expectations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously innovate to provide the best shopping experience and stay ahead
                  of industry trends.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-muted-foreground">
              We are a diverse team of passionate individuals working together to bring you the
              best shopping experience. Our team combines expertise in technology, customer
              service, and retail to create a seamless shopping platform.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
} 