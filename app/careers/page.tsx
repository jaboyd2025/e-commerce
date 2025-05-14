import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, Users, Heart, Zap } from 'lucide-react'

export default function CareersPage() {
  const benefits = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Career Growth",
      description: "Opportunities for advancement and professional development"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Environment",
      description: "Work with talented individuals in a supportive team setting"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Work-Life Balance",
      description: "Flexible schedules and paid time off"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Innovation",
      description: "Be part of a forward-thinking fashion technology company"
    }
  ]

  const openPositions = [
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Frostburg, MD",
      type: "Full-time",
      description: "Join our team to build beautiful, responsive user interfaces using Next.js and React."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Frostburg, MD",
      type: "Full-time",
      description: "Create intuitive and engaging user experiences for our e-commerce platform."
    },
    {
      title: "Backend Developer",
      department: "Engineering",
      location: "Frostburg, MD",
      type: "Full-time",
      description: "Develop and maintain our backend services using Node.js and PostgreSQL."
    }
  ]

  return (
    <div className="container max-w-7xl py-12">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Join Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of a team that's revolutionizing the fashion industry through technology and innovation.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-center">Why Join Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Open Positions Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-center">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{position.title}</h3>
                    <p className="text-muted-foreground">{position.department}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Location:</span> {position.location}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Type:</span> {position.type}
                    </p>
                  </div>
                  <p className="text-muted-foreground">{position.description}</p>
                  <Button className="w-full">Apply Now</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process Section */}
        <Card className="p-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-center">Our Application Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">1</div>
                <h3 className="font-semibold">Apply</h3>
                <p className="text-sm text-muted-foreground">Submit your application</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">2</div>
                <h3 className="font-semibold">Review</h3>
                <p className="text-sm text-muted-foreground">We review your application</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">3</div>
                <h3 className="font-semibold">Interview</h3>
                <p className="text-sm text-muted-foreground">Meet with our team</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">4</div>
                <h3 className="font-semibold">Offer</h3>
                <p className="text-sm text-muted-foreground">Join our team</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Section */}
        <Card className="p-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold">Questions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              If you have any questions about our open positions or the application process,
              please don't hesitate to reach out to our team.
            </p>
            <Button variant="outline" className="mt-4">
              Contact HR
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 