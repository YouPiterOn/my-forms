import { useParams, useNavigate } from "react-router"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { useState } from "react"
import { useGetFormQuery } from "../graphql/get-form.generated"
import { useGetResponsesPageQuery } from "../graphql/get-responses-page.generated"
import { Button } from "../components/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card"

export function FormResponses() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [page, setPage] = useState(0)
  const pageSize = 10

  const formQuery = useGetFormQuery({ id: id! })

  const responsesQuery = useGetResponsesPageQuery({
    pagination: {
      page,
      pageSize,
    },
    filters: {
      formId: id,
    },
  })

  const form = formQuery.data?.form
  const responsesPage = responsesQuery.data?.responsesPage
  const formResponses = responsesPage?.data ?? []

  if (!form) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Form Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Back Home</Button>
        </div>
      </div>
    )
  }

  const formatAnswer = (answer: string | string[] | undefined | null) => {
    if(!answer) return '';
    if (Array.isArray(answer)) {
      return answer.join(", ")
    }
    return answer
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{form.title} - Responses</h1>
          <p className="text-gray-600 mt-2">
            {responsesPage?.totalItems ?? 0} response
            {(responsesPage?.totalItems ?? 0) !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {formResponses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No responses yet</h3>
            <p className="text-gray-600 mb-6">Share your form to start collecting responses</p>
            <Button onClick={() => navigate(`/forms/${id}/fill`)}>Preview Form</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-6">
            {formResponses.map((response, index) => (
              <Card key={response.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Response #{page * pageSize + index + 1}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {response.createdAt}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {response.answers?.map((answer, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-purple-200 pl-4"
                      >
                        <h4 className="font-medium text-gray-900 mb-1">
                          {answer.question?.label || ""}
                        </h4>
                        <p className="text-gray-700">{formatAnswer(answer.value || answer.values)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page {page + 1} of {responsesPage?.totalPages ?? 1}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={page + 1 >= (responsesPage?.totalPages ?? 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
