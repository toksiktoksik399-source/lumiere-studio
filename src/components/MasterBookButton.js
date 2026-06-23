"use client";

export default function MasterBookButton({ masterName, lang }) {
  function handleBook() {
    const data = { master: masterName };
    localStorage.setItem("lumiere_book", JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("lumiere-book", { detail: data }));
  }

  return (
    <a
      href={`/${lang}#contacts`}
      onClick={handleBook}
      className="inline-flex w-fit items-center gap-2 text-[10px] tracking-[0.35em] uppercase bg-[#c9a898] hover:bg-[#b8967a] text-white px-5 py-2.5 transition-colors"
    >
      ЗАПИСАТЬСЯ
    </a>
  );
}
