import { useState } from "react"
import { useParams, useNavigate } from "react-router"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useGetFormQuery } from "../graphql/get-form.generated"
import { Button } from "../components/Button"
import { useSubmitResponseMutation } from "../graphql/submit-response.generated"
import type { AnswerInput, ResponseInput } from "../services/types.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card"
import { Textarea } from "../components/Textarea"
import { Input } from "../components/Input"
import { Checkbox } from "../components/Checkbox"
import { Label } from "../components/Label"
import { RadioGroup, RadioGroupItem } from "../components/RadioGroup"

export function FormFiller() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const formQuery = useGetFormQuery({ id: id! })
  const [submitResponse, _] = useSubmitResponseMutation();
  const [answersMap, setAnswersMap] = useState<Record<string, AnswerInput>>({});
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const form = formQuery.data?.form;

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

  const setAnswer = (questionId: string, value: string | string[]) => {
    setAnswersMap((prev) => ({
      ...prev,
      [questionId]: typeof value === "string" ? { questionId, value } : { questionId, values: value },
    }));
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const current = answersMap[questionId]?.values || [];
    if (checked) {
      setAnswer(questionId, [...current, option]);
    } else {
      setAnswer(questionId, current.filter((a) => a !== option));
    }
  };

  const handleSubmit = () => {
    setError("")

    if (form.questions) {
      for (const question of form.questions) {
        if (question.required && !answersMap[question.id]) {
          setError(`Please answer the required question: "${question.label}"`)
          return
        }
      }
    }

    const response: ResponseInput = {
      formId: form.id,
      answers: Object.values(answersMap)
    }

    submitResponse({ input: response })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">Thank you for your response.</p>
            <Button onClick={() => navigate("/")}>Back to Forms</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{form.title}</h1>
          {form.description && <p className="text-gray-600 mt-2">{form.description}</p>}
        </div>
      </div>

      <div className="space-y-6">
        {form.questions && form.questions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {question.label}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {question.type === "TEXT" && (
                <Textarea
                  value={answersMap[question.id]?.value || ""}
                  onChange={(e) => setAnswer(question.id, e.target.value)}
                  placeholder="Your answer"
                />
              )}

              {question.type === "MULTIPLE_CHOICE" && (
                <RadioGroup
                  value={answersMap[question.id]?.value || ""}
                  onValueChange={(value) => setAnswer(question.id, value)}
                >
                  {question.options?.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                      <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === "CHECKBOX" && (
                <div className="space-y-2">
                  {question.options?.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${question.id}-${option}`}
                        checked={(answersMap[question.id]?.values || []).includes(option)}
                        onCheckedChange={(checked) => handleCheckboxChange(question.id, option, !!checked)}
                      />
                      <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              )}

              {question.type === "DATE" && (
                <Input
                  type="date"
                  value={answersMap[question.id]?.value || ""}
                  onChange={(e) => setAnswer(question.id, e.target.value)}
                />
              )}
            </CardContent>
          </Card>
        ))}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-end pt-6 border-t">
          <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
            Submit Form
          </Button>
        </div>
      </div>
    </div>
  )
}
