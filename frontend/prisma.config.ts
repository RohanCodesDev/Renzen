import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  orm: {
    adapter: "postgres",
    family: "postgres",
    target: "postgres",
  },
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});
