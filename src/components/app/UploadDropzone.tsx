"use client";

import { CloudUpload, FileText, Link2, Loader2, NotebookText, X } from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState } from "react";

export type UploadItem = {
	id: string;
	name: string;
	type: "pdf" | "youtube" | "web" | "notes";
	status: "queued" | "processing" | "ready" | "failed";
};

type UploadDropzoneProps = {
	onFilesChange?: (items: UploadItem[]) => void;
	onToast?: (message: string) => void;
};

export function UploadDropzone({ onFilesChange, onToast }: UploadDropzoneProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [items, setItems] = useState<UploadItem[]>([]);
	const [link, setLink] = useState("");
	const [dragging, setDragging] = useState(false);

	function updateItems(nextItems: UploadItem[]) {
		setItems(nextItems);
		onFilesChange?.(nextItems);
	}

	function addItems(next: UploadItem[]) {
		const queued = [...items, ...next];
		updateItems(queued);
		onToast?.("Material added. NeuroPilot is mocking extraction now.");
		window.setTimeout(() => {
			updateItems(queued.map((item) => (next.some((candidate) => candidate.id === item.id) ? { ...item, status: "ready" } : item)));
		}, 900);
	}

	function handleFiles(files: FileList | File[]) {
		const next = Array.from(files).map<UploadItem>((file) => ({
			id: `${file.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
			name: file.name,
			type: file.name.toLowerCase().endsWith(".pdf") ? "pdf" : "notes",
			status: "processing",
		}));
		if (next.length > 0) {
			addItems(next);
		}
	}

	function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.files) {
			handleFiles(event.target.files);
		}
		event.target.value = "";
	}

	function handleDrop(event: DragEvent<HTMLDivElement>) {
		event.preventDefault();
		setDragging(false);
		handleFiles(event.dataTransfer.files);
	}

	function addLink() {
		const cleanLink = link.trim();
		if (!cleanLink) {
			onToast?.("Paste a YouTube or website link first.");
			return;
		}
		const isYoutube = /youtube|youtu\.be/i.test(cleanLink);
		addItems([
			{
				id: `${cleanLink}-${Date.now()}`,
				name: cleanLink,
				type: isYoutube ? "youtube" : "web",
				status: "processing",
			},
		]);
		setLink("");
	}

	function removeItem(id: string) {
		const next = items.filter((item) => item.id !== id);
		updateItems(next);
		onToast?.("Material removed from the mock upload queue.");
	}

	return (
		<div className="space-y-4">
			<div
				onDragOver={(event) => {
					event.preventDefault();
					setDragging(true);
				}}
				onDragLeave={() => setDragging(false)}
				onDrop={handleDrop}
				className={`rounded-[1.5rem] border border-dashed p-6 text-center transition ${
					dragging ? "border-indigo-400 bg-indigo-50" : "border-slate-300 bg-white"
				}`}
			>
				<input ref={inputRef} type="file" multiple className="sr-only" accept=".pdf,.txt,.md,.doc,.docx" onChange={handleFileInput} />
				<div className="mx-auto grid size-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-700">
					<CloudUpload className="size-7" aria-hidden />
				</div>
				<h3 className="mt-4 text-lg font-semibold text-slate-950">Drop PDFs, notes, or source files</h3>
				<p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">Files are not uploaded anywhere. This is a local fake processing state for onboarding.</p>
				<button
					type="button"
					onClick={() => inputRef.current?.click()}
					className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-indigo-700 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-700/20 transition hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Choose files
				</button>
			</div>
			<div className="grid gap-3 sm:grid-cols-[1fr_auto]">
				<label className="sr-only" htmlFor="material-link">
					Paste YouTube or website link
				</label>
				<input
					id="material-link"
					value={link}
					onChange={(event) => setLink(event.target.value)}
					placeholder="Paste YouTube or website link"
					className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
				/>
				<button
					type="button"
					onClick={addLink}
					className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					<Link2 className="mr-2 size-4" aria-hidden />
					Add link
				</button>
			</div>
			{items.length > 0 ? (
				<div className="space-y-3">
					{items.map((item) => (
						<div key={item.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
							<div className="grid size-10 place-items-center rounded-2xl bg-slate-100 text-slate-600">
								{item.type === "notes" ? <NotebookText className="size-5" aria-hidden /> : <FileText className="size-5" aria-hidden />}
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-semibold text-slate-950">{item.name}</p>
								<p className="mt-1 text-xs font-medium capitalize text-slate-500">{item.type}</p>
							</div>
							<div className="flex items-center gap-2">
								<span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
									{item.status === "processing" ? <Loader2 className="size-3 animate-spin" aria-hidden /> : null}
									{item.status}
								</span>
								<button
									type="button"
									onClick={() => removeItem(item.id)}
									className="grid size-8 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
									aria-label={`Remove ${item.name}`}
								>
									<X className="size-4" aria-hidden />
								</button>
							</div>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
