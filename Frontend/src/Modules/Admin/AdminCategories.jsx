import { useEffect, useState } from "react";
import { useAdminAuth } from "../../Shared/context/AdminAuthContext";
import { categoriesApi } from "../../Shared/utils/api";
import { getCategoryIcon } from "../../Shared/utils/categoryIcons";
import CategoryIconPicker from "../../Shared/components/CategoryIconPicker";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Tag,
  Star,
  StarOff,
} from "lucide-react";

const emptyForm = {
  name: "",
  description: "",
  icon: "BookOpen",
  isPopular: false,
  order: 0,
};

const AdminCategories = () => {
  const { token } = useAdminAuth();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchCategories = async () => {
    try {
      const { data } = await categoriesApi.getAll();
      setCategories(data);
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setFormOpen(true);
  };

  const openEdit = (category) => {
    setEditingId(category._id);
    setForm({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "BookOpen",
      isPopular: Boolean(category.isPopular),
      order: category.order || 0,
    });
    setError("");
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await categoriesApi.update(editingId, form, token);
      } else {
        await categoriesApi.create(form, token);
      }
      await fetchCategories();
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this category? Courses/roadmaps using it will lose the tag."
      )
    ) {
      return;
    }
    setDeleting(id);
    try {
      await categoriesApi.delete(id, token);
      await fetchCategories();
    } catch {
      alert("Failed to delete category");
    } finally {
      setDeleting(null);
    }
  };

  const togglePopular = async (category) => {
    try {
      await categoriesApi.update(
        category._id,
        { isPopular: !category.isPopular },
        token
      );
      await fetchCategories();
    } catch {
      alert("Failed to update");
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="w-full bg-white border-b border-[#EBE5D9]">
        <div className="px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1816] mb-1">
              Manage Categories
            </h1>
            <p className="text-[#706A63]">
              Create categories, mark the ones that appear as Popular Topics on the home page.
            </p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#c07a5e] transition-colors self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" /> Add Category
          </button>
        </div>
      </div>

      <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
        {formOpen && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 rounded-2xl border border-[#EBE5D9] bg-white p-6 sm:p-8 shadow-sm space-y-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1A1816]">
                {editingId ? "Edit Category" : "New Category"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="p-1.5 text-[#706A63] hover:text-[#1A1816] rounded-md hover:bg-[#F9F6F0] transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-[#1A1816] mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] px-4 py-2.5 text-sm text-[#1A1816] shadow-sm focus:border-[#D48C70] focus:bg-white focus:ring-1 focus:ring-[#D48C70] focus:outline-none transition-all"
                  placeholder="e.g. Coding"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-[#1A1816] mb-2">
                  Icon
                </label>
                <CategoryIconPicker
                  value={form.icon}
                  onChange={(name) =>
                    setForm((prev) => ({ ...prev, icon: name }))
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#1A1816] mb-2">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] px-4 py-2.5 text-sm text-[#1A1816] shadow-sm focus:border-[#D48C70] focus:bg-white focus:ring-1 focus:ring-[#D48C70] focus:outline-none transition-all"
                  placeholder="Short description (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1816] mb-2">
                  Order (lower shows first)
                </label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] px-4 py-2.5 text-sm text-[#1A1816] shadow-sm focus:border-[#D48C70] focus:bg-white focus:ring-1 focus:ring-[#D48C70] focus:outline-none transition-all"
                />
              </div>

              <div className="flex items-center pt-7">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPopular"
                    checked={form.isPopular}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-[#EBE5D9] text-[#D48C70] focus:ring-[#D48C70]"
                  />
                  <span className="text-sm font-medium text-[#1A1816]">
                    Show as Popular Topic on home page
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-[#EBE5D9] bg-white px-5 py-2.5 text-sm font-medium text-[#1A1816] shadow-sm hover:bg-[#F9F6F0] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#c07a5e] disabled:opacity-50 transition-colors"
              >
                <Save className="h-4 w-4" />
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Save Changes"
                  : "Create Category"}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center text-[#706A63]">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#EBE5D9]">
            <Tag className="h-12 w-12 text-[#EBE5D9] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#1A1816] mb-2">
              No categories yet
            </h3>
            <p className="text-[#706A63] mb-6">
              Create your first category to start organizing courses and roadmaps.
            </p>
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#c07a5e] transition-colors"
            >
              <Plus className="h-4 w-4" /> Add Category
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#EBE5D9] bg-white shadow-sm">
            <table className="min-w-full divide-y divide-[#EBE5D9]">
              <thead className="bg-[#F9F6F0]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase">
                    Popular
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase">
                    Order
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-[#706A63] uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE5D9] bg-white">
                {categories.map((cat) => {
                  const Icon = getCategoryIcon(cat.icon);
                  return (
                    <tr key={cat._id} className="hover:bg-[#F9F6F0] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-[#F9F6F0] border border-[#EBE5D9] flex items-center justify-center text-[#D48C70]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-semibold text-[#1A1816]">
                            {cat.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#706A63] max-w-xs truncate">
                        {cat.description || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePopular(cat)}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold border transition-colors ${
                            cat.isPopular
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-[#F9F6F0] text-[#706A63] border-[#EBE5D9] hover:bg-[#EBE5D9]"
                          }`}
                        >
                          {cat.isPopular ? (
                            <>
                              <Star className="h-3 w-3" /> Popular
                            </>
                          ) : (
                            <>
                              <StarOff className="h-3 w-3" /> Not popular
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[#706A63]">
                        {cat.order ?? 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(cat)}
                            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#706A63] border border-[#EBE5D9] bg-white hover:bg-[#F9F6F0] hover:text-[#1A1816] transition-colors"
                          >
                            <Pencil className="h-3 w-3" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(cat._id)}
                            disabled={deleting === cat._id}
                            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 border border-red-200 bg-white hover:bg-red-50 disabled:opacity-50 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                            {deleting === cat._id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;