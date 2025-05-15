"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FRANKFURTER_API_URL = "https://api.frankfurter.app/latest";

const CURRENCIES = ["EUR", "USD", "GBP", "JPY", "CHF", "AUD", "CAD"];

export default function FrankfurterBlogPage() {
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const [base, setBase] = useState<string>("EUR");
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${FRANKFURTER_API_URL}?from=${base}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rates");
        return res.json();
      })
      .then((data) => {
        setRates(data.rates);
        setDate(data.date);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [base]);

  return (
    <main className="mx-auto py-10 px-4">
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">
            Exploring the Frankfurter API
          </CardTitle>
          <CardDescription>
            The{" "}
            <a
              href="https://www.frankfurter.app/"
              className="text-primary underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frankfurter API
            </a>{" "}
            is a free, open-source API for current and historical foreign
            exchange rates published by the European Central Bank. It's a great
            resource for developers who need up-to-date currency conversion data
            in their applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Badge variant="outline" className="text-base px-2 py-1">
                Live Example
              </Badge>
              Latest Exchange Rates
            </h2>
            <div className="mb-4 flex items-center gap-4">
              <Label htmlFor="base" className="font-medium">
                Base currency:
              </Label>
              <Select value={base} onValueChange={setBase}>
                <SelectTrigger className="w-32" id="base">
                  <SelectValue placeholder="Select base" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((cur) => (
                    <SelectItem key={cur} value={cur}>
                      {cur}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-muted-foreground py-4">
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Loading rates...</span>
              </div>
            )}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {rates && !loading && (
              <div>
                <p className="mb-2 text-sm text-muted-foreground">
                  Rates as of <span className="font-medium">{date}</span> (base:{" "}
                  <span className="font-mono">{base}</span>)
                </p>
                <div className="rounded-lg border overflow-x-auto bg-background">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Currency</TableHead>
                        <TableHead>Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(rates).map(([currency, rate]) => (
                        <TableRow key={currency}>
                          <TableCell className="font-medium">
                            {currency}
                          </TableCell>
                          <TableCell>{rate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">
              How to Use the Frankfurter API
            </h2>
            <p className="mb-2">
              The API is simple to use. For example, to get the latest rates
              with EUR as the base currency, you can make a GET request to:
            </p>
            <pre className="bg-muted p-3 rounded mb-2 text-sm overflow-x-auto">
              <code className="font-mono">
                GET https://api.frankfurter.app/latest?from=EUR
              </code>
            </pre>
            <p className="mb-2">
              You can also get historical rates, convert between currencies, and
              more. Check out the{" "}
              <a
                href="https://www.frankfurter.app/docs/"
                className="text-primary underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                official documentation
              </a>{" "}
              for all available endpoints and parameters.
            </p>
            <Button asChild variant="outline" className="mt-2">
              <a
                href="https://www.frankfurter.app/docs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View API Docs
              </a>
            </Button>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
