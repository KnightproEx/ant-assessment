import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const createLog = createServerFn({ method: "POST" }).handler(async () => {
	const log = await prisma.accessLog.create({ data: { user: "anonymous" } });
	return log;
});

function getOperatingSystem(window: Window) {
	let operatingSystem = "Not known";
	if (window.navigator.appVersion.indexOf("Win") !== -1) {
		operatingSystem = "Windows OS";
	}
	if (window.navigator.appVersion.indexOf("Mac") !== -1) {
		operatingSystem = "MacOS";
	}
	if (window.navigator.appVersion.indexOf("X11") !== -1) {
		operatingSystem = "UNIX OS";
	}
	if (window.navigator.appVersion.indexOf("Linux") !== -1) {
		operatingSystem = "Linux OS";
	}

	return operatingSystem;
}

function getBrowser(window: Window) {
	let currentBrowser = "Not known";
	if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
		currentBrowser = "Google Chrome";
	} else if (window.navigator.userAgent.indexOf("Firefox") !== -1) {
		currentBrowser = "Mozilla Firefox";
	} else if (window.navigator.userAgent.indexOf("MSIE") !== -1) {
		currentBrowser = "Internet Exployer";
	} else if (window.navigator.userAgent.indexOf("Edge") !== -1) {
		currentBrowser = "Edge";
	} else if (window.navigator.userAgent.indexOf("Safari") !== -1) {
		currentBrowser = "Safari";
	} else if (window.navigator.userAgent.indexOf("Opera") !== -1) {
		currentBrowser = "Opera";
	} else if (window.navigator.userAgent.indexOf("Opera") !== -1) {
		currentBrowser = "YaBrowser";
	} else {
		console.log("Others");
	}

	return currentBrowser;
}

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => {
		const version = process.env.VERSION;

		if (version === "3") {
			const log = await createLog();
			return { log, version };
		}

		return { version };
	},
});

function Home() {
	const data = Route.useLoaderData();
	const version = data.version;

	return version === "1" ? (
		<Version1 />
	) : version === "2" ? (
		<Version2 />
	) : version === "3" ? (
		<Version3 />
	) : (
		<></>
	);
}

function Version1() {
	return <p>Hello World</p>;
}

function Version2() {
	return (
		<div>
			<p>OS: {getOperatingSystem(window)}</p>
			<p>Browser: {getBrowser(window)}</p>
		</div>
	);
}

function Version3() {
	const data = Route.useLoaderData();
	return (
		<div>
			<p>Your access is logged</p>
			<p>{JSON.stringify(data.log ?? "")}</p>
		</div>
	);
}
