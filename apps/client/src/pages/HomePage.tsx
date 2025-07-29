import { Link } from "react-router"
import { Plus, FileText, BarChart3 } from "lucide-react"
import { useGetFormsPageQuery } from "../graphql/get-forms-page.generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card"
import { Button } from "../components/Button"
import { useState } from "react"

export function HomePage() {
  const [page, setPage] = useState(0)
  const pageSize = 10

  const { data, error, isLoading } = useGetFormsPageQuery({ pagination: { page, pageSize } }, {
    refetchOnMountOrArgChange: true,
  });
  const forms = data?.formsPage.data ?? []

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forms</h1>
          <p className="text-gray-600 mt-2">Create and manage your forms</p>
        </div>
        <Link to="/forms/new">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Form
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Failed to load forms.</p>
      ) : forms.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No forms yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first form</p>
          <Link to="/forms/new">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Form
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4 mb-6">
            {forms.map((form) => (
              <Card key={form.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{form.title}</CardTitle>
                  <CardDescription className="text-gray-600">{form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Link to={`/forms/${form.id}/fill`}>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        View Form
                      </Button>
                    </Link>
                    <Link to={`/forms/${form.id}/responses`}>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Responses
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span className="text-gray-700 text-sm">
              Page {page + 1} of {data?.formsPage.totalPages ?? 1}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(p + 1, (data?.formsPage.totalPages ?? 1) - 1))}
              disabled={page >= (data?.formsPage.totalPages ?? 1) - 1}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}