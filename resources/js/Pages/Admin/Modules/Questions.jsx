import React, { useState, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import QuestionForm from "@/Features/Modules/Components/QuestionForm";

export default function Questions({ questions = [], topics = [] }) {
  const [selectedTopicId, setSelectedTopicId] = useState(
    topics[0]?.id || null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);

  const filteredQuestions = useMemo(() => {
    if (!selectedTopicId) return [];
    return questions.filter(
      (q) => q.topic_id === selectedTopicId
    );
  }, [questions, selectedTopicId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* SUBJECT SELECTOR */}
      <div className="lg:col-span-3">
        <div className="bg-white p-4 rounded-xl border">
          <h2 className="text-xs font-black uppercase text-gray-400 mb-4">
            Select Subject
          </h2>

          <div className="space-y-2">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopicId(t.id)}
                className={`w-full text-left p-3 rounded-lg text-sm ${
                  selectedTopicId === t.id
                    ? "bg-green-600 text-white font-bold"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* QUESTION LIST */}
      <div className="lg:col-span-9 space-y-6">
        <div className="bg-white p-6 rounded-xl border flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Questions
          </h2>

          <Button
            onClick={() => {
              setEditQuestion(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600"
          >
            + Create Question
          </Button>
        </div>

        {isFormOpen ? (
          <QuestionForm
            topicId={selectedTopicId}
            question={editQuestion}
            onCancel={() => setIsFormOpen(false)}
          />
        ) : (
          <div className="space-y-4">
            {filteredQuestions.length === 0 && (
              <div className="text-center text-gray-400 py-20">
                No questions found
              </div>
            )}

            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white p-6 rounded-xl border relative"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />

                <div className="flex justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-gray-400">
                    #{q.id} • {q.type}
                  </span>

                  <div className="flex gap-3 text-sm">
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        setEditQuestion(q);
                        setIsFormOpen(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-500"
                      onClick={() =>
                        router.delete(
                          route("admin.questions.destroy", q.id)
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="font-medium mb-4">{q.question_text}</p>

                {q.type === "multiple_choice" && q.answers?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.answers.map((a) => (
                      <div
                        key={a.id}
                        className={`p-2 text-xs rounded border ${
                          a.is_correct
                            ? "bg-green-50 border-green-200 text-green-700 font-bold"
                            : "bg-gray-50"
                        }`}
                      >
                        {a.is_correct && "✓ "} {a.answer_text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
