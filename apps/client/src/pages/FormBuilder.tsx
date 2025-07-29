import { useState } from "react"
import { useNavigate } from "react-router"
import { ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react"
import type { QuestionInput, QuestionType } from "../services/types.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card"
import { Label } from "../components/Label"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { Textarea } from "../components/Textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/Select"
import { useCreateFormMutation } from "../graphql/create-form.generated"
import { Checkbox } from "../components/Checkbox"

export function FormBuilder() {
  const navigate = useNavigate()
  const [trigger, _] = useCreateFormMutation();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<QuestionInput[]>([])

  const addQuestion = () => {
    const newQuestion: QuestionInput = {
      type: "TEXT",
      label: "",
      required: false,
      options: [],
      order: 0,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (index: number, updates: Partial<QuestionInput>) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, ...updates } : q))
    )
  }

  const deleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }

  const addOption = (index: number) => {
    const question = questions[index]
    const options = question.options ?? []
    updateQuestion(index, { options: [...options, ""] })
  }

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const question = questions[qIndex]
    if (!question.options) return
    const newOptions = [...question.options]
    newOptions[oIndex] = value
    updateQuestion(qIndex, { options: newOptions })
  }

  const removeOption = (qIndex: number, oIndex: number) => {
    const question = questions[qIndex]
    if (!question.options) return
    const newOptions = question.options.filter((_, i) => i !== oIndex)
    updateQuestion(qIndex, { options: newOptions })
  }

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a form title")
      return
    }
    trigger({
      input: {
        title: title.trim(),
        description: description.trim(),
        questions,
      }
    })

    navigate("/")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Form</h1>
          <p className="text-gray-600 mt-2">Build your custom form</p>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Form Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Form Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter form title"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter form description"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {questions.map((question, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <CardTitle className="text-lg">Question {index + 1}</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => deleteQuestion(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Question Label</Label>
                <Input
                  value={question.label}
                  onChange={(e) => updateQuestion(index, { label: e.target.value })}
                  placeholder="Enter question"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <Label>Question Type</Label>
                  <Select
                    value={question.type}
                    onValueChange={(value: QuestionType) =>
                      updateQuestion(index, { type: value })
                    }
                  >
                    <SelectTrigger className="w-48 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TEXT">Text Input</SelectItem>
                      <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
                      <SelectItem value="CHECKBOX">Checkboxes</SelectItem>
                      <SelectItem value="DATE">Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id={`required-${index}`}
                    checked={question.required}
                    onCheckedChange={(checked) =>
                      updateQuestion(index, { required: !!checked })
                    }
                  />
                  <Label htmlFor={`required-${index}`}>Required</Label>
                </div>
              </div>

              {(question.type === "MULTIPLE_CHOICE" || question.type === "CHECKBOX") && (
                <div>
                  <Label>Options</Label>
                  <div className="space-y-2 mt-2">
                    {question.options?.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) =>
                            updateOption(index, optionIndex, e.target.value)
                          }
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOption(index, optionIndex)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addOption(index)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              {question.type === "DATE" && (
                <div className="space-y-2">
                  <div>
                    <Label htmlFor={`min-date-${index}`}>Min Date</Label>
                    <Input
                      id={`min-date-${index}`}
                      type="date"
                      value={question.minDate || ""}
                      onChange={(e) =>
                        updateQuestion(index, { minDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`max-date-${index}`}>Max Date</Label>
                    <Input
                      id={`max-date-${index}`}
                      type="date"
                      value={question.maxDate || ""}
                      onChange={(e) =>
                        updateQuestion(index, { maxDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-center">
          <Button variant="outline" onClick={addQuestion}>
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            Save Form
          </Button>
        </div>
      </div>
    </div>
  )
}
