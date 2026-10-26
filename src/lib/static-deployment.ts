// GitHub project pages are mounted below the repository name; Lovable stays at /.
export function staticDeployment(githubPages: boolean) {
  return {
    base: githubPages ? "/adrians-portfolio/" : "/",
    publicDir: ".output/public",
    serverDir: ".output/server",
  };
}