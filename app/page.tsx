"use client"

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex justify-center items-center"> 
      <Card className="space-y-10 shadow-md">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-3xl font-bold">Dost</CardTitle>
          <CardDescription className="-space-y-4">A user friendly , text generation AI tool</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center items-center">
          <Button onClick={()=>router.push('/dashboard')}> Explore✨ </Button>
        </CardFooter>
      </Card>

    </div>  
  );
}
