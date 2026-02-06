<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Halaman Tidak Ditemukan</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: #ffffff;
        }

        .dots-bg {
            background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
            background-size: 24px 24px;
            position: absolute;
            inset: 0;
            z-index: -1;
            mask-image: radial-gradient(ellipse at center, black, transparent 80%);
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen antialiased">
    <div class="dots-bg"></div>

    <main class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div class="max-w-screen-sm mx-auto text-center">
            <span class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 mb-8">
                Error 404
            </span>

            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-slate-900">
                Terputus.
            </h1>
            
            <p class="mb-4 text-3xl tracking-tight font-bold text-slate-800 md:text-4xl">
                Halaman tidak ditemukan.
            </p>
            
            <p class="mb-8 text-lg font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
                Maaf, halaman yang Anda tuju telah dipindahkan atau tidak tersedia di jaringan CBT FK Unila.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="/login" class="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-900 rounded-xl hover:bg-emerald-600 transition-colors duration-200 focus:ring-4 focus:outline-none focus:ring-emerald-300">
                    Masuk ke Sistem
                </a>
            </div>

            <div class="mt-16 flex items-center justify-center gap-4 opacity-40 grayscale">
                <img src="/images/logo.png" alt="Unila" class="h-10 w-auto">
                <div class="h-8 w-[1px] bg-slate-400"></div>
                <span class="text-xs font-bold tracking-widest uppercase text-slate-600">Team IT FK Unila</span>
            </div>
        </div>
    </main>
</body>
</html>