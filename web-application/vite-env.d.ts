interface ViteTypeOptions {
	strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
	readonly VITE_VERSION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
