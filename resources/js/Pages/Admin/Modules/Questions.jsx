import React, { useMemo, useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import {
  PlusIcon,
  XMarkIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function Questions({ topics = [], questions = [] }) {
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || null);

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    topic_id: selectedTopicId,
    type: "multiple_choice", // multiple_choice | essay
    question_text: "",
    question_image: null, // FILE
    options: [
      { text: "", is_correct: true },
      { text: "", is_correct: false },
      { text: "", is_correct: false },
      { text: "", is_correct: false },
    ],
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      topic_id: selectedTopicId,
    }));
  }, [selectedTopicId]);

  const filteredQuestions = useMemo(() => {
    if (!selectedTopicId) return [];
    return questions.filter((q) => q.topic_id === selectedTopicId);
  }, [questions, selectedTopicId]);

  const openCreate = () => {
    setMode("create");
    setEditingId(null);
    setForm({
      topic_id: selectedTopicId,
      type: "multiple_choice",
      question_text: "",
      question_image: null,
      options: [
        { text: "", is_correct: true },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
      ],
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const openEdit = (q) => {
    setMode("edit");
    setEditingId(q.id);

    setForm({
      topic_id: q.topic_id,
      type: q.type,
      question_text: q.question_text || "",
      question_image: null, // file baru kalau user upload
      options:
        q.type === "multiple_choice"
          ? (q.answers || []).map((a) => ({
              text: a.answer_text,
              is_correct: !!a.is_correct,
            }))
          : [
              { text: "", is_correct: true },
              { text: "", is_correct: false },
              { text: "", is_correct: false },
              { text: "", is_correct: false },
            ],
    });

    if (q.question_image) {
      setImagePreview(`/storage/${q.question_image}`);
    } else {
      setImagePreview(null);
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const setCorrectOption = (idx) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.map((o, i) => ({
        ...o,
        is_correct: i === idx,
      })),
    }));
  };

  const addOption = () => {
    setForm((prev) => ({
      ...prev,
      options: [...prev.options, { text: "", is_correct: false }],
    }));
  };

  const removeOption = (idx) => {
    setForm((prev) => {
      const next = prev.options.filter((_, i) => i !== idx);

      if (!next.some((o) => o.is_correct) && next.length > 0) {
        next[0].is_correct = true;
      }

      return { ...prev, options: next };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    setForm((prev) => ({
      ...prev,
      question_image: file,
    }));

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      topic_id: form.topic_id,
      type: form.type,
      question_text: form.question_text,
      question_image: form.question_image, // FILE
    };

    if (form.type === "multiple_choice") {
      payload.options = form.options.map((o) => ({
        text: o.text,
        is_correct: !!o.is_correct,
      }));
    }

    if (mode === "create") {
      router.post(route("admin.questions.store"), payload, {
        preserveScroll: true,
        preserveState: true,
        forceFormData: true,
        onSuccess: () => {
          closeModal();

          // refresh data TANPA pindah halaman
          router.reload({
            only: ["questions", "topics"],
            preserveScroll: true,
            preserveState: true,
          });
        },
      });
    } else {
      // FIX UTAMA: update pakai POST + _method PUT biar aman untuk FormData
      router.post(
        route("admin.questions.update", editingId),
        { ...payload, _method: "PUT" },
        {
          preserveScroll: true,
          preserveState: true,
          forceFormData: true,
          onSuccess: () => {
            closeModal();

            router.reload({
              only: ["questions", "topics"],
              preserveScroll: true,
              preserveState: true,
            });
          },
        }
      );
    }
  };

  const deleteQuestion = (id) => {
    if (!confirm("Hapus question ini?")) return;

    router.delete(route("admin.questions.destroy", id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        router.reload({
          only: ["questions", "topics"],
          preserveScroll: true,
          preserveState: true,
        });
      },
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SUBJECT SELECTOR */}
        <div className="lg:col-span-3">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h2 className="text-xs font-black uppercase text-gray-400 mb-4 tracking-widest">
              Select Subject
            </h2>

            <div className="space-y-2">
              {topics.length === 0 && (
                <div className="text-sm text-gray-400">Belum ada subject.</div>
              )}

              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopicId(t.id)}
                  className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                    selectedTopicId === t.id
                      ? "bg-green-600 text-white shadow-md font-bold"
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
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Questions</h2>

            <Button onClick={openCreate} className="bg-blue-600 flex gap-2">
              <PlusIcon className="w-4 h-4" />
              Create Question
            </Button>
          </div>

          <div className="space-y-4">
            {filteredQuestions.length === 0 && (
              <div className="text-center text-gray-400 py-20 bg-white rounded-xl border">
                No questions found
              </div>
            )}

            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />

                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black uppercase text-gray-400">
                    {q.type === "multiple_choice" ? "MULTIPLE CHOICE" : "ESSAY"}
                  </span>

                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                      onClick={() => openEdit(q)}
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                      onClick={() => deleteQuestion(q.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-gray-800 font-medium mb-4">
                  {q.question_text}
                </p>

                {/* tampilkan gambar kalau ada */}
                {q.question_image && (
                  <div className="mb-4">
                    <img
                      src={`/storage/${q.question_image}`}
                      alt="question"
                      className="max-h-56 rounded-xl border"
                    />
                  </div>
                )}

                {q.type === "multiple_choice" && q.answers?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.answers.map((a) => (
                      <div
                        key={a.id}
                        className={`p-2 rounded text-xs border flex items-start gap-2 ${
                          a.is_correct
                            ? "bg-green-50 border-green-200 text-green-700 font-bold"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <span className="mt-[2px]">
                          {a.is_correct ? "✓" : "•"}
                        </span>
                        <span>{a.answer_text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL CREATE/EDIT */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            onSubmit={submit}
            className="bg-white rounded-2xl w-full max-w-3xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">
                {mode === "create" ? "Add Question" : "Edit Question"}
              </h2>

              <button type="button" onClick={closeModal}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label className="text-xs font-black uppercase text-gray-400">
                    Question Content
                  </label>
                  <textarea
                    required
                    className="w-full border rounded-xl px-4 py-3 mt-2 min-h-[120px]"
                    value={form.question_text}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        question_text: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* IMAGE UPLOAD */}
                <div>
                  <label className="text-xs font-black uppercase text-gray-400">
                    Media Attachment (Optional)
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full mt-2 text-sm"
                    onChange={handleImageChange}
                  />

                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="max-h-56 rounded-xl border"
                      />
                      <button
                        type="button"
                        className="text-xs text-red-600 mt-2"
                        onClick={() => {
                          setForm((prev) => ({ ...prev, question_image: null }));
                          setImagePreview(null);
                        }}
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="text-xs font-black uppercase text-gray-400">
                    Question Type
                  </label>

                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, type: "multiple_choice" }))
                      }
                      className={`px-4 py-2 rounded-full text-sm font-bold border ${
                        form.type === "multiple_choice"
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-500"
                      }`}
                    >
                      MULTIPLE CHOICE
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, type: "essay" }))
                      }
                      className={`px-4 py-2 rounded-full text-sm font-bold border ${
                        form.type === "essay"
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-500"
                      }`}
                    >
                      ESSAY
                    </button>
                  </div>
                </div>

                {form.type === "multiple_choice" && (
                  <div className="border rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-xs font-black uppercase text-gray-400">
                        Answer Options
                      </label>

                      <button
                        type="button"
                        onClick={addOption}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800"
                      >
                        + ADD OPTION
                      </button>
                    </div>

                    <div className="space-y-3">
                      {form.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={opt.is_correct}
                            onChange={() => setCorrectOption(idx)}
                          />

                          <input
                            required
                            className="flex-1 border rounded-lg px-3 py-2"
                            value={opt.text}
                            onChange={(e) => {
                              const value = e.target.value;
                              setForm((prev) => ({
                                ...prev,
                                options: prev.options.map((o, i) =>
                                  i === idx ? { ...o, text: value } : o
                                ),
                              }));
                            }}
                          />

                          {form.options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeOption(idx)}
                              className="text-red-500 hover:text-red-700"
                              title="Remove option"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600">
                Save Question
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
