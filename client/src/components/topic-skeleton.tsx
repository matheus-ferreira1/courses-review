export default function TopicSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border flex items-center justify-center size-44"
        >
          <div className="bg-primary-foreground w-[70%] h-4" />
        </div>
      ))}
    </div>
  );
}
