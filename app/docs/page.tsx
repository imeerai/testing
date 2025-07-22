import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Shield, Users, Scale, AlertTriangle, CheckCircle } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive terms, conditions, and guidelines for using Business Nexus platform. Everything you need to
              know about connecting investors and entrepreneurs safely and effectively.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <a
              href="#terms"
              className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg border hover:shadow-md transition-all group"
            >
              <Scale className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Terms of Service</span>
            </a>
            <a
              href="#privacy"
              className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg border hover:shadow-md transition-all group"
            >
              <Shield className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Privacy Policy</span>
            </a>
            <a
              href="#guidelines"
              className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg border hover:shadow-md transition-all group"
            >
              <Users className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Community Guidelines</span>
            </a>
            <a
              href="#investment"
              className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg border hover:shadow-md transition-all group"
            >
              <AlertTriangle className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Investment Guidelines</span>
            </a>
          </div>

          <div className="space-y-12">
            {/* Terms of Service */}
            <Card id="terms" className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Scale className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex items-center space-x-3">
                      <span>Terms of Service</span>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        Updated Jan 2024
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Legal terms and conditions for using our platform
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-slate-100">
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      1. Acceptance of Terms
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using Business Nexus, you accept and agree to be bound by the terms and provision
                      of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      2. Platform Purpose
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Business Nexus is designed to facilitate connections between investors and entrepreneurs. We
                      provide a platform for networking, communication, and potential business partnerships.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      3. User Responsibilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="font-medium mb-2">Profile Accuracy</h4>
                        <p className="text-sm text-muted-foreground">
                          Provide accurate and truthful information in your profile
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="font-medium mb-2">Professional Conduct</h4>
                        <p className="text-sm text-muted-foreground">
                          Maintain professional conduct in all communications
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="font-medium mb-2">IP Respect</h4>
                        <p className="text-sm text-muted-foreground">
                          Respect intellectual property and confidential information
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="font-medium mb-2">Legal Compliance</h4>
                        <p className="text-sm text-muted-foreground">Comply with all applicable laws and regulations</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                      4. Investment Disclaimer
                    </h3>
                    <div className="p-6 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <p className="text-orange-800 dark:text-orange-200 leading-relaxed">
                        <strong>Important:</strong> Business Nexus does not provide investment advice or guarantee
                        investment outcomes. All investment decisions are made at your own risk. We recommend conducting
                        thorough due diligence before making any investment commitments.
                      </p>
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            {/* Privacy Policy */}
            <Card id="privacy" className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex items-center space-x-3">
                      <span>Privacy Policy</span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        Updated Jan 2025
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      How we collect, use, and protect your personal information
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      1. Information We Collect
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-lg">Personal Information</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Account registration details
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Profile information
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Contact information
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium text-lg">Usage Data</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Communication data
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Platform activity
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Feature usage analytics
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Shield className="h-5 w-5 text-blue-600 mr-2" />
                      2. Data Security
                    </h3>
                    <div className="p-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                        We implement appropriate security measures to protect your personal information against
                        unauthorized access, alteration, disclosure, or destruction. Your data is encrypted and stored
                        securely.
                      </p>
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            {/* Community Guidelines */}
            <Card id="guidelines" className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex items-center space-x-3">
                      <span>Community Guidelines</span>
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      >
                        Updated Jan 2025
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Standards for professional conduct on our platform
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Professional Standards
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Maintain professional standards in all interactions. Treat all users with respect and courtesy,
                      regardless of their background or business focus.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                        <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ Do</h4>
                        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                          <li>Be respectful and professional</li>
                          <li>Provide accurate information</li>
                          <li>Respect confidentiality</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                        <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Don't</h4>
                        <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                          <li>Harass or discriminate</li>
                          <li>Share spam content</li>
                          <li>Misrepresent yourself</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                        <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">⚠️ Report</h4>
                        <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                          <li>Inappropriate behavior</li>
                          <li>Fraudulent activities</li>
                          <li>Policy violations</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            {/* Investment Guidelines */}
            <Card id="investment" className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex items-center space-x-3">
                      <span>Investment Guidelines</span>
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                      >
                        Updated Jan 2025
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Best practices for investors and entrepreneurs
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">For Investors</h3>
                    <div className="space-y-4">
                      {[
                        "Conduct thorough due diligence",
                        "Clearly communicate investment criteria",
                        "Respect intellectual property",
                        "Provide constructive feedback",
                        "Be transparent about processes",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg"
                        >
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <span className="text-blue-800 dark:text-blue-200">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4 text-green-600">For Entrepreneurs</h3>
                    <div className="space-y-4">
                      {[
                        "Present accurate financial information",
                        "Prepare clear business plans",
                        "Understand investment terms",
                        "Maintain regular communication",
                        "Be realistic about valuations",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg"
                        >
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <span className="text-green-800 dark:text-green-200">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="p-8 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-6">
                If you have questions about our terms or need clarification on any policy, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:legal@businessnexus.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Email Legal Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
