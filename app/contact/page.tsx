import { Card } from '@/components/ui/card'
import { Mail } from 'lucide-react'

export default function ContactPage() {
  const teamMembers = [
    {
      name: 'Jaylen Boyd',
      email: 'jaboyd0@frostburg.edu',
      role: 'Lead Developer'
    },
    {
      name: 'Anthony Pinon',
      email: 'aipinon0@frostburg.edu',
      role: 'UI/UX Designer'
    },
    {
      name: 'Paul James',
      email: 'pkjames0@frostburg.edu',
      role: 'Backend Developer'
    }
  ]

  return (
    <div className="container max-w-7xl py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our team for any questions or support you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {teamMembers.map((member) => (
            <Card key={member.email} className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
              <p className="text-muted-foreground mb-4">{member.role}</p>
              <a 
                href={`mailto:${member.email}`}
                className="flex items-center text-primary hover:underline"
              >
                <Mail className="h-4 w-4 mr-2" />
                {member.email}
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Office Location</h2>
            <p className="text-muted-foreground">
              Frostburg State University<br />
              101 Braddock Road<br />
              Frostburg, MD 21532
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
} 