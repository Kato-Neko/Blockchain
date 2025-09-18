import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/vote/card"
import { Badge } from "@/components/ui/vote/badge"
import { Progress } from "@/components/ui/vote/progress"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Vote, ArrowLeft } from "lucide-react"

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
    party: "Ray Pinyoko Party",
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

export default function ResultsPage() {
  const navigate = useNavigate()
  
  const [results, setResults] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("http://localhost:8080/api/votes/results")
        if (!response.ok) throw new Error("Network response was not ok")
        const data = await response.json()
        setResults(data)
      } catch (err) {
        setError(err.message)
        console.error("Failed to fetch results:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchResults()
  }, [])

  const totalVotes = Object.values(results).reduce((sum, count) => sum + count, 0)

  const getVotePercentage = (candidateVotes) => {
    if (!candidateVotes) return 0
    return totalVotes > 0 ? (candidateVotes / totalVotes) * 100 : 0
  }

  const sortedCandidates = [...candidates].sort((a, b) => (results[b.id] || 0) - (results[a.id] || 0))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Vote className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-balance">2024 Presidential Poll Results</h1>
                <p className="text-muted-foreground">Live voting results and statistics</p>
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
        {isLoading && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">Loading Results...</h2>
            <p className="text-muted-foreground">Please wait a moment.</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16 text-destructive">
            <h2 className="text-2xl font-semibold">Failed to Load Results</h2>
            <p>Could not connect to the server. Please try again later.</p>
            <p className="text-sm mt-2">Error: {error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
        {/* Results Section */}
        <section>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Live Poll Results</h2>
            </div>
            <p className="text-muted-foreground">Real-time voting results updated as votes are cast</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Standings</span>
                  <Badge variant="secondary">{totalVotes.toLocaleString()} total votes</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {sortedCandidates.map((candidate, index) => {
                  const candidateVotes = results[candidate.id] || 0
                  const percentage = getVotePercentage(candidateVotes)

                  return (
                    <div key={candidate.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-bold text-gray-600">
                                {candidate.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate.party}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{percentage.toFixed(1)}%</div>
                          <div className="text-sm text-muted-foreground">{candidateVotes.toLocaleString()} votes</div>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-3" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Additional Statistics */}
        <section className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalVotes.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">votes cast</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Leading Candidate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sortedCandidates[0]?.name.split(' ')[0]}</div>
                <p className="text-xs text-muted-foreground">
                  {getVotePercentage(results[sortedCandidates[0]?.id]).toFixed(1)}% of votes
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Margin of Victory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sortedCandidates.length > 1 
                    ? (getVotePercentage(results[sortedCandidates[0]?.id]) - getVotePercentage(results[sortedCandidates[1]?.id])).toFixed(1)
                    : 0
                  }%
                </div>
                <p className="text-xs text-muted-foreground">between top 2</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Back to Vote Button */}
        <section className="text-center mt-12 mb-12">
          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="px-8 py-3"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Vote
          </Button>
        </section>
        </>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>This is a demonstration poll for visualization purposes only.</p>
          <p className="mt-1">For official voting information, visit your local election office.</p>
        </footer>
      </main>
    </div>
  )
}
  