interface FormBtn {
  loading: boolean;
  text: string;
}

export default function FormBtn({ loading, text }: FormBtn) {
  return (
    <button
      disabled={loading}
      className="primary-btn h-10 text-xl disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {loading ? "Loading..." : text}
    </button>
  );
}
