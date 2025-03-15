"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Plus, X, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost } from "@/data/blog-posts";

const initialContent = [
  { type: 'paragraph', content: 'Start writing your blog post here...' },
];

export default function NewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState(initialContent);
  const [editorTab, setEditorTab] = useState("content");
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single one

      setSlug(generatedSlug);
    }
  }, [title]);

  const handleSavePost = () => {
    // Validate required fields
    if (!title || !slug || !excerpt || !category || !coverImage) {
      alert("Please fill in all required fields.");
      return;
    }

    setSaving(true);

    // Simulate saving to a database
    setTimeout(() => {
      // In a real app, this would save to a database
      const newPost: BlogPost = {
        title,
        slug,
        excerpt,
        category,
        tags,
        coverImage,
        content,
        date: new Date().toISOString().split('T')[0],
      };

      console.log("Saving new blog post:", newPost);
      alert("In a real application, this post would be saved to a database.");

      setSaving(false);
      router.push("/admin/blog");
    }, 1500);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Button
            variant="ghost"
            className="mb-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">New Blog Post</h1>
          <p className="text-muted-foreground mt-1">Create a new blog post</p>
        </div>
        <Button
          onClick={handleSavePost}
          disabled={saving}
          className="min-w-[100px]"
        >
          {saving ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              Saving
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>Write and format your blog post</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a compelling title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug <span className="text-destructive">*</span></Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="url-friendly-post-name"
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be the URL of your post: https://yourdomain.com/blog/{slug}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt <span className="text-destructive">*</span></Label>
                  <Input
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="A brief summary of your post (appears in previews)"
                  />
                </div>
              </div>

              <div className="mt-8">
                <Tabs value={editorTab} onValueChange={setEditorTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="content" className="min-h-[300px]">
                    <textarea
                      className="w-full min-h-[300px] p-4 rounded-md border border-input bg-background"
                      value={content[0].content}
                      onChange={(e) => setContent([{ type: 'paragraph', content: e.target.value }])}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      In a real editor, this would be a rich text editor with formatting options.
                    </p>
                  </TabsContent>
                  <TabsContent value="preview" className="min-h-[300px]">
                    <div className="prose dark:prose-invert p-4 border rounded-md max-w-none min-h-[300px]">
                      {content[0].content}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>Metadata for your blog post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Web Design, SEO, Branding"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-muted text-foreground text-xs px-2 py-1 rounded-md flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add a tag and press Enter"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      if (tagInput.trim()) {
                        if (!tags.includes(tagInput.trim())) {
                          setTags([...tags, tagInput.trim()]);
                        }
                        setTagInput("");
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL <span className="text-destructive">*</span></Label>
                <div className="flex space-x-2">
                  <Input
                    id="coverImage"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={() => alert("In a real app, this would open an image upload dialog.")}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                {coverImage && (
                  <div className="mt-4 aspect-video relative overflow-hidden rounded-lg border bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/1200x630/eee/ccc?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  In a real application, you would have an image upload feature here.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleSavePost}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Post"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="publishDate">Publication Date</Label>
                <Input
                  id="publishDate"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
                <p className="text-xs text-muted-foreground">
                  Defaults to today's date if left blank.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
