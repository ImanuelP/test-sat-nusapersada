
export const getServer = async (page: string) => {
    try {
        const resData = await fetch(`${process.env.LINK_API}${page}`, {
          next: { revalidate: 60 },
        });
        if (!resData.ok) {
           console.log("error");
        }
        return resData.json();
      } catch (err: any) {
        console.log(err.message);
      }
}