import { Card, CardContent } from "./ui/card";

export default function Skeleton() {
  return (
    <div className="flex flex-wrap gap-4 animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} className="size-72">
          <CardContent className="flex flex-col aspect-square items-center justify-center p-4 space-y-4">
            <div className="mt-6 rounded-full size-16 bg-primary-foreground" />
            <div className="bg-primary-foreground w-[70%] h-4" />
            <div className="bg-primary-foreground w-[70%] h-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
