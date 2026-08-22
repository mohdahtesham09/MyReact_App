import React, { useState, useEffect } from "react";
import {
  X, Plus, Edit, Trash2, Eye, EyeOff, Star, ArrowUp, ArrowDown, Upload, Check, AlertCircle, RefreshCw, LogOut, Image as ImageIcon, FileText, Link as LinkIcon, Pin
} from "lucide-react";
import { RESUME_VIEW_URL } from "../../config";

const AdminDashboard = ({ isOpen, onClose, token, onLogout, onProjectsUpdated }) => {
  const [activeTab, setActiveTab] = useState("projects"); // "projects" | "resume"
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [resumeUrl, setResumeUrl] = useState(RESUME_VIEW_URL);
  const [resumePdfUrl, setResumePdfUrl] = useState("/resume.pdf");
  const [resumeSaving, setResumeSaving] = useState(false);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/config");
      if (res.ok) {
        const data = await res.json();
        if (data.resumeUrl) setResumeUrl(data.resumeUrl);
        if (data.resumePdfUrl) setResumePdfUrl(data.resumePdfUrl);
      }
    } catch (err) {}
  };

  const [editingId, setEditingId] = useState(null); // null = creating, id = editing
  const [showFormModal, setShowFormModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    problem: "",
    solution: "",
    featuresText: "",
    techText: "",
    category: "MERN Full Stack",
    role: "Full Stack Developer",
    github: "https://github.com/mohdahtesham09",
    live: "#",
    image: "",
    screenshots: [],
    architecture: "",
    metrics: "",
    featured: false,
    published: true,
    pinned: true
  });

  const fetchAdminProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/projects?all=true", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects. Please check authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResume = async (e) => {
    e.preventDefault();
    setResumeSaving(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeUrl, resumePdfUrl })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("Resume configuration saved as single source of truth across portfolio!");
      } else {
        setError(data.error || "Failed to save resume configuration.");
      }
    } catch (err) {
      setError("Server error saving resume config.");
    } finally {
      setResumeSaving(false);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchAdminProjects();
      fetchConfig();
    }
  }, [isOpen, token]);

  if (!isOpen) return null;

  const handleOpenCreateForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      slug: "",
      tagline: "",
      description: "",
      problem: "",
      solution: "",
      featuresText: "",
      techText: "",
      category: "MERN Full Stack",
      role: "Full Stack Developer",
      github: "https://github.com/mohdahtesham09",
      live: "#",
      image: "",
      screenshots: [],
      architecture: "",
      metrics: "",
      featured: false,
      published: true,
      pinned: true
    });
    setShowFormModal(true);
  };

  const handleOpenEditForm = (proj) => {
    setEditingId(proj.id);
    setFormData({
      name: proj.name || "",
      slug: proj.slug || "",
      tagline: proj.tagline || "",
      description: proj.description || proj.desc || "",
      problem: proj.problem || "",
      solution: proj.solution || "",
      featuresText: Array.isArray(proj.features) ? proj.features.join(", ") : "",
      techText: Array.isArray(proj.technologies) ? proj.technologies.join(", ") : (Array.isArray(proj.tech) ? proj.tech.join(", ") : ""),
      category: proj.category || "MERN Full Stack",
      role: proj.role || "Developer",
      github: proj.github || "",
      live: proj.live || "",
      image: proj.image || "",
      screenshots: proj.screenshots || [],
      architecture: proj.architecture || "",
      metrics: proj.metrics || "",
      featured: proj.featured || false,
      published: proj.published !== false,
      pinned: proj.pinned !== false
    });
    setShowFormModal(true);
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const bodyData = new FormData();
    bodyData.append("image", file);

    try {
      const res = await fetch("/api/upload/single", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: bodyData
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
        setSuccessMsg("Thumbnail uploaded successfully!");
      } else {
        setError(data.error || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Image upload server error.");
    } finally {
      setUploading(false);
    }
  };

  const handleScreenshotsUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const bodyData = new FormData();
    for (let i = 0; i < files.length; i++) {
      bodyData.append("images", files[i]);
    }

    try {
      const res = await fetch("/api/upload/multiple", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: bodyData
      });
      const data = await res.json();
      if (res.ok && data.urls) {
        setFormData(prev => ({
          ...prev,
          screenshots: [...prev.screenshots, ...data.urls]
        }));
        setSuccessMsg("Screenshots uploaded successfully!");
      } else {
        setError(data.error || "Screenshots upload failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Screenshots upload server error.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...formData,
      features: formData.featuresText.split(",").map(s => s.trim()).filter(Boolean),
      technologies: formData.techText.split(",").map(s => s.trim().replace(/^#/, "")).filter(Boolean)
    };

    const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(editingId ? "Project updated successfully!" : "Project created successfully!");
        setShowFormModal(false);
        fetchAdminProjects();
        if (onProjectsUpdated) onProjectsUpdated();
      } else {
        setError(data.error || "Failed to save project.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error while saving project.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setSuccessMsg("Project deleted.");
        fetchAdminProjects();
        if (onProjectsUpdated) onProjectsUpdated();
      } else {
        setError("Failed to delete project.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error deleting project.");
    }
  };

  const handleTogglePublish = async (proj) => {
    try {
      const res = await fetch(`/api/projects/${proj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ published: !proj.published })
      });
      if (res.ok) {
        fetchAdminProjects();
        if (onProjectsUpdated) onProjectsUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeatured = async (proj) => {
    try {
      const res = await fetch(`/api/projects/${proj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ featured: !proj.featured })
      });
      if (res.ok) {
        fetchAdminProjects();
        if (onProjectsUpdated) onProjectsUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePinned = async (proj) => {
    try {
      const res = await fetch(`/api/projects/${proj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ pinned: !proj.pinned })
      });
      if (res.ok) {
        fetchAdminProjects();
        if (onProjectsUpdated) onProjectsUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveOrder = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;

    const orderedIds = newProjects.map(p => p.id);

    try {
      const res = await fetch("/api/projects/reorder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orderedIds })
      });
      if (res.ok) {
        fetchAdminProjects();
        if (onProjectsUpdated) onProjectsUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[92vh] bg-[#0F172A] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-white/10 bg-white/5 shrink-0 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Portfolio Management CMS
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 font-semibold">
                Admin Mode
              </span>
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "projects"
                    ? "bg-primary-blue text-white shadow-md"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                Project Catalog
              </button>
              <button
                onClick={() => setActiveTab("resume")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === "resume"
                    ? "bg-brand-purple text-white shadow-md"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <FileText size={14} /> Resume Management
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "projects" && (
              <button
                onClick={handleOpenCreateForm}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-teal hover:from-blue-600 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-brand-blue/20"
              >
                <Plus size={16} /> New Project
              </button>
            )}
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-xs flex items-center gap-1"
              title="Logout Admin"
            >
              <LogOut size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {(error || successMsg) && (
          <div className="px-6 pt-4 shrink-0">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-xs flex items-center justify-between">
                <span>{error}</span>
                <button onClick={() => setError("")}><X size={14} /></button>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-xs flex items-center justify-between">
                <span>{successMsg}</span>
                <button onClick={() => setSuccessMsg("")}><X size={14} /></button>
              </div>
            )}
          </div>
        )}

        {/* Resume Management Tab Content */}
        {activeTab === "resume" ? (
          <div className="p-6 overflow-y-auto flex-grow">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
                    <FileText size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Centralized Resume Link</h3>
                    <p className="text-xs text-gray-400">
                      This URL is used across Navbar, Hero, Recruiter Quick View, About, Contact, Footer, and AI Assistant.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveResume} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                      Resume View Link (Google Drive / Cloud URL)
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3.5 top-3 text-gray-500">
                          <LinkIcon size={16} />
                        </span>
                        <input
                          type="url"
                          value={resumeUrl}
                          onChange={(e) => setResumeUrl(e.target.value)}
                          placeholder="https://drive.google.com/file/d/..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                          required
                        />
                      </div>
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Eye size={14} /> Test Link
                      </a>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                      Resume PDF File URL (Optional Download File)
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3.5 top-3 text-gray-500">
                          <FileText size={16} />
                        </span>
                        <input
                          type="text"
                          value={resumePdfUrl}
                          onChange={(e) => setResumePdfUrl(e.target.value)}
                          placeholder="/resume.pdf or https://..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                        />
                      </div>
                      {resumePdfUrl && (
                        <a
                          href={resumePdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Eye size={14} /> Test PDF
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={resumeSaving}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg"
                    >
                      {resumeSaving ? "Saving..." : "Update Resume Config"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 space-y-1">
                <p className="font-semibold">💡 Single Source of Truth</p>
                <p className="text-gray-400">
                  When you update the URL here, every resume button, download action, and AI Assistant response across the website automatically points to the new link.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Project List */
          <div className="p-6 overflow-y-auto flex-grow space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
              <RefreshCw size={20} className="animate-spin text-brand-teal" /> Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              No projects found. Click "New Project" to add one!
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className={`p-4 rounded-xl bg-white/5 border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    !proj.published ? "opacity-60 border-dashed border-gray-600" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail preview */}
                    <div className="w-16 h-12 rounded-lg bg-black/40 overflow-hidden shrink-0 border border-white/10">
                      {proj.image ? (
                        <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          <ImageIcon size={18} />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-bold text-base">{proj.name}</h4>
                        {proj.pinned !== false && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold flex items-center gap-1">
                            <Pin size={10} fill="currentColor" /> Pinned
                          </span>
                        )}
                        {proj.featured && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-brand-yellow border border-amber-500/30 font-semibold flex items-center gap-1">
                            <Star size={10} fill="currentColor" /> Featured
                          </span>
                        )}
                        {!proj.published && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-500/20 text-gray-400 border border-gray-500/30 font-semibold">
                            Draft / Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs line-clamp-1">{proj.tagline || proj.description || proj.desc}</p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5 justify-end">
                    {/* Reorder Buttons */}
                    <button
                      onClick={() => handleMoveOrder(idx, "up")}
                      disabled={idx === 0}
                      className="p-2 text-gray-400 hover:text-white disabled:opacity-30 bg-white/5 rounded-lg text-xs"
                      title="Move Up"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(idx, "down")}
                      disabled={idx === projects.length - 1}
                      className="p-2 text-gray-400 hover:text-white disabled:opacity-30 bg-white/5 rounded-lg text-xs"
                      title="Move Down"
                    >
                      <ArrowDown size={16} />
                    </button>

                    {/* Pin Toggle */}
                    <button
                      onClick={() => handleTogglePinned(proj)}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        proj.pinned !== false ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                      title={proj.pinned !== false ? "Unpin from Homepage" : "Pin to Homepage (Max 4)"}
                    >
                      <Pin size={16} fill={proj.pinned !== false ? "currentColor" : "none"} />
                    </button>

                    {/* Featured Toggle */}
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        proj.featured ? "bg-amber-500/20 text-brand-yellow" : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                      title={proj.featured ? "Unmark Featured" : "Mark Featured"}
                    >
                      <Star size={16} fill={proj.featured ? "currentColor" : "none"} />
                    </button>

                    {/* Published Toggle */}
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        proj.published !== false ? "bg-green-500/20 text-brand-green" : "bg-red-500/20 text-red-400"
                      }`}
                      title={proj.published !== false ? "Unpublish Project" : "Publish Project"}
                    >
                      {proj.published !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleOpenEditForm(proj)}
                      className="p-2 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg text-xs"
                      title="Edit Project"
                    >
                      <Edit size={16} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteProject(proj.id, proj.name)}
                      className="p-2 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-lg text-xs"
                      title="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}

        {/* Modal Form for Create / Edit */}
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-3xl h-[88vh] bg-[#0B132B] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
                <h3 className="text-lg font-bold text-white">
                  {editingId ? "Edit Project Details" : "Create New Project"}
                </h3>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="p-2 overflow-y-auto space-y-4 flex-grow my-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Project Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">URL Slug</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="e.g. mediastack"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Tagline / Short Summary *</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    required
                    placeholder="e.g. AI Voice & Chat Booking Engine for Dental Clinics"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Description</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Problem Statement</label>
                    <textarea
                      rows="2"
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Solution Engineered</label>
                    <textarea
                      rows="2"
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.techText}
                      onChange={(e) => setFormData({ ...formData, techText: e.target.value })}
                      placeholder="React, Node.js, Express, Groq API, n8n"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Features (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.featuresText}
                      onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                      placeholder="Voice AI integration, n8n webhook triggers, React analytics"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                    >
                      <option value="MERN Full Stack">MERN Full Stack</option>
                      <option value="Python Full Stack">Python Full Stack</option>
                      <option value="AI Engineering">AI Engineering</option>
                      <option value="GenAI Engineering">GenAI Engineering</option>
                      <option value="n8n Automation">n8n Automation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Role / Contribution</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Full Stack & AI Developer"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Live Demo URL</label>
                    <input
                      type="text"
                      value={formData.live}
                      onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                </div>

                {/* Thumbnail Image Upload */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Project Thumbnail Image</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Image URL or upload below"
                      className="flex-grow bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:border-brand-teal focus:outline-none"
                    />
                    <label className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/10 cursor-pointer flex items-center gap-1.5 shrink-0">
                      <Upload size={14} /> Upload Image
                      <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="hidden" />
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-3 w-32 h-20 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                      <img src={formData.image} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Screenshots Upload */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Project Screenshots</label>
                  <label className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/10 cursor-pointer flex items-center gap-1.5 w-fit">
                    <Upload size={14} /> Add Screenshots
                    <input type="file" accept="image/*" multiple onChange={handleScreenshotsUpload} className="hidden" />
                  </label>
                  {formData.screenshots.length > 0 && (
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {formData.screenshots.map((sUrl, idx) => (
                        <div key={idx} className="relative group w-full h-16 rounded bg-black/40 overflow-hidden border border-white/10">
                          <img src={sUrl} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, screenshots: prev.screenshots.filter((_, i) => i !== idx) }))}
                            className="absolute top-1 right-1 p-1 rounded bg-black/70 text-red-400 hover:text-white"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Architecture Overview</label>
                    <input
                      type="text"
                      value={formData.architecture}
                      onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
                      placeholder="Client-Server with Node/Express & React"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Results & Metrics</label>
                    <input
                      type="text"
                      value={formData.metrics}
                      onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                      placeholder="Sub-100ms API responses"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.pinned}
                      onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-blue-400 focus:ring-blue-400"
                    />
                    <span>Pin to Homepage (Max 4 Pinned)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-brand-teal focus:ring-brand-teal"
                    />
                    <span>Mark as Featured Project</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-brand-teal focus:ring-brand-teal"
                    />
                    <span>Published (Visible to public)</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="px-6 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-600 text-white font-bold text-sm shadow-lg flex items-center gap-2"
                  >
                    {loading ? "Saving..." : "Save Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
