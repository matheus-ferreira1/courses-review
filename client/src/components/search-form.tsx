import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchForm = () => {
  return (
    <div className="space-y-4 my-10 container">
      <div className="flex flex-col justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight lg:text-4xl">Busca</h1>

        <form className="space-y-2">
          <Input placeholder="Pesquise por um curso ou educador" />
          <Button>Buscar</Button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
