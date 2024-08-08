"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { formSchema } from "./constants";
import { FormControl, FormItem, FormField } from "@/components/ui/form";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  prompt: string;
  response: string;
}

export default function Conversation() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/text", values);
      setMessages((prevMessages) => [
        ...prevMessages,
        { prompt: values.prompt, response: response.data.data },
      ]);
      form.reset();
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Heading
        title="Conversation"
        description="Our most advanced conversational model powered by Llama 2"
        Icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="flex-grow px-4 lg:px-8 overflow-y-auto">
        <div className="space-y-4 mt-4">
          {messages.map((message, index) => (
            <div key={index} className="">
              <div className="bg-blue-100 p-4 border rounded-lg w-full ml-4 self-end">
                <p className="flex justify-end font-semibold">User:</p>
                <p className="flex justify-end">{message.prompt}</p>
              </div>
              <div className="bg-gray-100 p-4 border rounded-lg w-full">
                <p className="font-semibold">Response:</p>
                <p>{message.response}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full p-4">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="How may I help you!"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
