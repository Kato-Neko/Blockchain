import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/vote/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/vote/badge"
import { CheckCircle, Vote, Users, BarChart3 } from "lucide-react"

const candidates = [
  {
    id: "1",
    name: "Nick Carter",
    party: "Cantooth Party",
    experience: "Former Governor, 12 years in Senate",
    keyPolicies: ["Healthcare Reform", "Climate Action", "Education Investment"],
    votes: 0,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Jermaine Gadiano",
    party: "Ray Pinyoko Party",
    experience: "Business Leader, Former Secretary of State",
    keyPolicies: ["Economic Growth", "Border Security", "Tax Reform"],
    votes: 0,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Ben Dover",
    party: "Mike Hawk Party",
    experience: "Tech Executive, Former Mayor",
    keyPolicies: ["Digital Innovation", "Government Transparency", "Infrastructure"],
    votes: 0,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Alpha Kenny Buddy",
    party: "Wee Tod Party",
    experience: "Environmental Lawyer, Former Congressman",
    keyPolicies: ["Environmental Protection", "Renewable Energy", "Social Justice"],
    votes: 0,
    image: "/placeholder.svg",
  },
]

export default function VotePage() {
  const navigate = useNavigate()
  const [votedFor, setVotedFor] = useState(null)
  const [totalVotes, setTotalVotes] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/votes/results")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const results = await response.json()
        const currentTotal = Object.values(results).reduce((sum, count) => sum + count, 0)
        setTotalVotes(currentTotal)
      } catch (error) {
        console.error("Failed to fetch initial vote count:", error)
      }
    }
    fetchInitialData()
  }, [])

  const handleVote = async (candidateId) => {
    if (votedFor || isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch("http://localhost:8080/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId }),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      setVotedFor(candidateId)
      setTotalVotes((prevTotal) => prevTotal + 1)
    } catch (error) {
      console.error("Failed to submit vote:", error)
      alert("There was a problem submitting your vote. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Vote className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-balance">2024 Presidential Poll</h1>
                <p className="text-muted-foreground">Cast your vote and see live results</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="font-medium">{totalVotes.toLocaleString()} votes cast</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Voting Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-balance">Choose Your Candidate</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Review each candidate's background and key policies, then cast your vote in our presidential poll.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {candidates.map((candidate) => (
              <Card key={candidate.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-border">
                      <span className="text-2xl font-bold text-gray-600">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{candidate.name}</CardTitle>
                      <Badge variant="secondary" className="mb-2">
                        {candidate.party}
                      </Badge>
                      <CardDescription className="text-sm">{candidate.experience}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Key Policies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {candidate.keyPolicies.map((policy, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {policy}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleVote(candidate.id)}
                    disabled={votedFor !== null || isSubmitting}
                    className="w-full"
                    variant={votedFor === candidate.id ? "default" : "outline"}
                  >
                    {votedFor === candidate.id ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Vote Recorded
                      </>
                    ) : isSubmitting ? (
                      "Submitting..."
                    ) : votedFor ? (
                      "Voting Closed"
                    ) : (
                      "Vote for " + candidate.name.split(" ")[0]
                    )}
                  </Button>
                </CardContent>

                {votedFor === candidate.id && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* View Results Button */}
        <section className="text-center mb-12">
          <Button 
            onClick={() => navigate('/results')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            View Poll Results
          </Button>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>This is a demonstration poll for visualization purposes only.</p>
          <p className="mt-1">For official voting information, visit your local election office.</p>
        </footer>
      </main>
    </div>
  )
}
