<script lang="ts">
    import { getDownloadURL, type AppAsset } from "$lib/utils/download";
    import { onMount } from "svelte";

    let asset: AppAsset | null = null;

    async function download() {
        if (asset) {
            const a = document.createElement("a");

            a.href = asset.url;
            a.download = asset.name;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    onMount(async () => {
        asset = await getDownloadURL(navigator.userAgent || navigator.vendor);
    });
</script>

<svelte:head>
    <meta
        name="description"
        content="Unlock Actionable Insights with Our Business Analytics App - Transform your data into strategic decisions with our powerful business analytics app. Visualize trends, track key metrics, and make informed choices that drive growth. Experience real-time data analysis at your fingertips. Try our business analytics app today for sharper insights and smarter business moves."
    />
    <title>Business App | Studiotwofour</title>
</svelte:head>
<div
    class="w-full min-h-screen flex items-center justify-center flex-col gap-10"
>
    <p class="text-primary">Business Application</p>
    <h1 class="text-6xl font-bold text-center max-w-4xl">
        Empower Your Business with Advanced Analytics
    </h1>
    <p class="max-w-md text-center opacity-60">
        A comprehensive dashboard allowing you to manage all aspects of your
        business
    </p>
    <div class="mt-20">
        <button
            class="px-20 py-4 bg-primary hover:bg-lime-500 disabled:bg-white disabled:text-black disabled:opacity-40 disabled:cursor-not-allowed text-black font-medium rounded-md"
            disabled={asset == null}
            on:click={download}
        >
            Download now
        </button>
    </div>
</div>
