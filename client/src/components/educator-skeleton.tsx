export default function EducatorSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="border flex items-center justify-center gap-4 py-4"
        >
          <div className="rounded-full size-16 bg-primary-foreground" />
          <div className="bg-primary-foreground w-[70%] h-4" />
        </div>
      ))}
    </div>
  );
}
