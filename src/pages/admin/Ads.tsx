import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil, Trash2, Pause, Play, PlusCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/* -------------------- Types -------------------- */
interface Ad {
  id: string;
  user_id: string;
  currency_id: string;
  order_type: "buy" | "sell";
  price: number;
  min_amount: number;
  max_amount: number;
  available_amount: number;
  payment_methods: string[];
  status: "active" | "paused" | "expired";
  terms?: string;
  views: number;
  created_at?: string;
}

interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  active: boolean;
  created_at?: string;
}

/* -------------------- Component -------------------- */
const AdsAndCurrencies = () => {
  const { toast } = useToast();

  const [ads, setAds] = useState<Ad[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [loadingCurrencies, setLoadingCurrencies] = useState(false);
  const [currencySearch, setCurrencySearch] = useState("");
  const [showCreateCurrency, setShowCreateCurrency] = useState(false);
  const [showEditCurrency, setShowEditCurrency] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );
  const [currencyForm, setCurrencyForm] = useState({
    code: "",
    name: "",
    symbol: "",
    active: true,
  });

  const [loadingAds, setLoadingAds] = useState(false);
  const [adSearch, setAdSearch] = useState("");
  const [showCreateAd, setShowCreateAd] = useState(false);
  const [showManageAd, setShowManageAd] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [adForm, setAdForm] = useState({
    currency_id: "",
    order_type: "sell" as "buy" | "sell",
    price: "",
    min_amount: "",
    max_amount: "",
    available_amount: "",
    payment_methods: "",
    terms: "",
  });

  /* -------------------- Currency Map -------------------- */
  const currencyMap = useMemo(() => {
    const m = new Map<string, Currency>();
    currencies.forEach((c) => m.set(c.id, c));
    return m;
  }, [currencies]);

  /* -------------------- Auth User -------------------- */
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data?.user?.id ?? null);
    };
    getUser();
  }, []);

  /* -------------------- Fetch Data -------------------- */
  const fetchAds = async () => {
    setLoadingAds(true);
    const { data, error } = await supabase
      .from("ads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({
        title: "Error fetching ads",
        description: error.message,
        variant: "destructive",
      });
    } else setAds(data as Ad[]);
    setLoadingAds(false);
  };

  const fetchCurrencies = async () => {
    setLoadingCurrencies(true);
    const { data, error } = await supabase
      .from("currencies")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({
        title: "Error fetching currencies",
        description: error.message,
        variant: "destructive",
      });
    } else setCurrencies(data as Currency[]);
    setLoadingCurrencies(false);
  };

  useEffect(() => {
    fetchCurrencies();
    fetchAds();
  }, []);

  /* -------------------- Currency CRUD -------------------- */
  const handleCreateCurrency = async () => {
    const { code, name, symbol, active } = currencyForm;
    if (!code || !name || !symbol)
      return toast({
        title: "All fields are required",
        variant: "destructive",
      });

    const { error } = await supabase
      .from("currencies")
      .insert([
        {
          code: code.trim().toUpperCase(),
          name: name.trim(),
          symbol: symbol.trim(),
          active,
        },
      ]);
    if (error)
      toast({
        title: "Failed creating currency",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: "Currency created" });
      setShowCreateCurrency(false);
      setCurrencyForm({ code: "", name: "", symbol: "", active: true });
      fetchCurrencies();
    }
  };

  const handleEditCurrency = async () => {
    if (!selectedCurrency) return;
    const { code, name, symbol, active } = currencyForm;
    const { error } = await supabase
      .from("currencies")
      .update({ code: code.trim().toUpperCase(), name, symbol, active })
      .eq("id", selectedCurrency.id);
    if (error)
      toast({
        title: "Failed updating currency",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: "Currency updated" });
      setShowEditCurrency(false);
      setSelectedCurrency(null);
      fetchCurrencies();
    }
  };

  const handleDeleteCurrency = async (currency: Currency) => {
    if (!confirm(`Delete currency ${currency.code}?`)) return;
    const { error } = await supabase
      .from("currencies")
      .delete()
      .eq("id", currency.id);
    if (error)
      toast({
        title: "Failed deleting currency",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: "Currency deleted" });
      fetchCurrencies();
    }
  };

  /* -------------------- Ads CRUD -------------------- */
  const handleCreateAd = async () => {
    const {
      currency_id,
      order_type,
      price,
      min_amount,
      max_amount,
      available_amount,
      payment_methods,
      terms,
    } = adForm;

    if (
      !currency_id ||
      !order_type ||
      !price ||
      !min_amount ||
      !max_amount ||
      !available_amount ||
      !payment_methods
    ) {
      toast({ title: "All fields are required", variant: "destructive" });
      return;
    }
    if (!userId) {
      toast({
        title: "Login required",
        description: "Please log in first.",
        variant: "destructive",
      });
      return;
    }

    const newAd = {
      user_id: userId,
      currency_id,
      order_type,
      price: Number(price),
      min_amount: Number(min_amount),
      max_amount: Number(max_amount),
      available_amount: Number(available_amount),
      payment_methods: payment_methods.split(",").map((s) => s.trim()),
      status: "active" as const,
      terms: terms || null,
      views: 0,
    };

    const { error } = await supabase.from("ads").insert([newAd]);
    if (error)
      toast({
        title: "Failed creating ad",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: "Ad created" });
      setShowCreateAd(false);
      setAdForm({
        currency_id: "",
        order_type: "sell",
        price: "",
        min_amount: "",
        max_amount: "",
        available_amount: "",
        payment_methods: "",
        terms: "",
      });
      fetchAds();
    }
  };

  const handleUpdateAd = async (updates: Partial<Ad>) => {
    if (!selectedAd) return;
    const { error } = await supabase
      .from("ads")
      .update(updates)
      .eq("id", selectedAd.id);
    if (error)
      toast({
        title: "Failed updating ad",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: "Ad updated" });
      setShowManageAd(false);
      setSelectedAd(null);
      fetchAds();
    }
  };

  const handleDeleteAd = async () => {
    if (!selectedAd) return;
    if (!confirm(`Delete this ad?`)) return;
    const { error } = await supabase
      .from("ads")
      .delete()
      .eq("id", selectedAd.id);
    if (error)
      toast({
        title: "Failed deleting ad",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: "Ad deleted" });
      setShowManageAd(false);
      setSelectedAd(null);
      fetchAds();
    }
  };

  /* -------------------- Filtered Lists -------------------- */
  const filteredCurrencies = currencies.filter((c) =>
    `${c.code} ${c.name}`.toLowerCase().includes(currencySearch.toLowerCase())
  );
  const filteredAds = ads.filter((a) => {
    const currency = currencyMap.get(a.currency_id);
    const text = currency ? `${currency.code} ${currency.name}` : a.currency_id;
    return text.toLowerCase().includes(adSearch.toLowerCase());
  });

  /* -------------------- Helpers -------------------- */
  const openEditCurrency = (c: Currency) => {
    setSelectedCurrency(c);
    setCurrencyForm({
      code: c.code,
      name: c.name,
      symbol: c.symbol,
      active: c.active,
    });
    setShowEditCurrency(true);
  };
  const openManageAd = (a: Ad) => {
    setSelectedAd(a);
    setShowManageAd(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* CURRENCIES SECTION */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Currencies</h2>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Search currencies..."
                value={currencySearch}
                onChange={(e) => setCurrencySearch(e.target.value)}
                className="pl-10"
              />
              <Button
                onClick={() => {
                  setCurrencyForm({
                    code: "",
                    name: "",
                    symbol: "",
                    active: true,
                  });
                  setShowCreateCurrency(true);
                }}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                <PlusCircle className="w-4 h-4" /> Add Currency
              </Button>
            </div>
          </div>

          <Card className="p-4">
            {loadingCurrencies ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <div className="text-muted-foreground">
                  Loading currencies...
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCurrencies.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono">{c.code}</TableCell>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.symbol}</TableCell>
                      <TableCell>
                        <Badge variant={c.active ? "default" : "secondary"}>
                          {c.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(c.created_at ?? "").toLocaleString()}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditCurrency(c)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCurrency(c)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>

        {/* ADS SECTION */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Advertisements</h2>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Search ads (currency / type)..."
                value={adSearch}
                onChange={(e) => setAdSearch(e.target.value)}
              />
              <Button
                onClick={() => {
                  setAdForm({
                    currency_id: "",
                    order_type: "sell",
                    price: "",
                    min_amount: "",
                    max_amount: "",
                    available_amount: "",
                    payment_methods: "",
                    terms: "",
                  });
                  setShowCreateAd(true);
                }}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                <PlusCircle className="w-4 h-4" /> Create Ad
              </Button>
            </div>
          </div>

          <Card className="p-4">
            {loadingAds ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <div className="text-muted-foreground">Loading ads...</div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAds.map((a) => {
                    const cur = currencyMap.get(a.currency_id);
                    return (
                      <TableRow key={a.id}>
                        <TableCell className="font-mono text-xs">
                          {a.id.slice(0, 8)}
                        </TableCell>
                        <TableCell>
                          {cur ? `${cur.code} — ${cur.name}` : a.currency_id}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              a.order_type === "buy" ? "default" : "secondary"
                            }
                          >
                            {a.order_type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>${a.price.toLocaleString()}</TableCell>
                        <TableCell>{a.available_amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              a.status === "active"
                                ? "default"
                                : a.status === "paused"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {a.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{a.views}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openManageAd(a)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>
      </div>

      {/* Create Currency Modal */}
      <Dialog open={showCreateCurrency} onOpenChange={setShowCreateCurrency}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Currency</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Label>Code</Label>
            <Input
              value={currencyForm.code}
              onChange={(e) =>
                setCurrencyForm({ ...currencyForm, code: e.target.value })
              }
              placeholder="e.g. USDT"
            />
            <Label>Name</Label>
            <Input
              value={currencyForm.name}
              onChange={(e) =>
                setCurrencyForm({ ...currencyForm, name: e.target.value })
              }
              placeholder="e.g. Tether USD"
            />
            <Label>Symbol</Label>
            <Input
              value={currencyForm.symbol}
              onChange={(e) =>
                setCurrencyForm({ ...currencyForm, symbol: e.target.value })
              }
              placeholder="e.g. ₮"
            />
            <div className="flex items-center gap-2">
              <input
                id="active-cb"
                type="checkbox"
                checked={currencyForm.active}
                onChange={(e) =>
                  setCurrencyForm({ ...currencyForm, active: e.target.checked })
                }
              />
              <Label htmlFor="active-cb">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateCurrency}>Create Currency</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Currency Modal */}
      <Dialog open={showEditCurrency} onOpenChange={setShowEditCurrency}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Currency</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Label>Code</Label>
            <Input
              value={currencyForm.code}
              onChange={(e) =>
                setCurrencyForm({ ...currencyForm, code: e.target.value })
              }
            />
            <Label>Name</Label>
            <Input
              value={currencyForm.name}
              onChange={(e) =>
                setCurrencyForm({ ...currencyForm, name: e.target.value })
              }
            />
            <Label>Symbol</Label>
            <Input
              value={currencyForm.symbol}
              onChange={(e) =>
                setCurrencyForm({ ...currencyForm, symbol: e.target.value })
              }
            />
            <div className="flex items-center gap-2">
              <input
                id="active-cb-2"
                type="checkbox"
                checked={currencyForm.active}
                onChange={(e) =>
                  setCurrencyForm({ ...currencyForm, active: e.target.checked })
                }
              />
              <Label htmlFor="active-cb-2">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditCurrency}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Ad Modal */}
      <Dialog open={showCreateAd} onOpenChange={setShowCreateAd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Advertisement</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <Label>Currency</Label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={adForm.currency_id}
              onChange={(e) =>
                setAdForm({ ...adForm, currency_id: e.target.value })
              }
            >
              <option value="">Select currency</option>
              {currencies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>

            <Label>Order Type</Label>
            <select
              value={adForm.order_type}
              onChange={(e) =>
                setAdForm({
                  ...adForm,
                  order_type: e.target.value as "buy" | "sell",
                })
              }
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="sell">Sell</option>
              <option value="buy">Buy</option>
            </select>

            <Label>Price (USD)</Label>
            <Input
              type="number"
              value={adForm.price}
              onChange={(e) => setAdForm({ ...adForm, price: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Min Amount</Label>
                <Input
                  type="number"
                  value={adForm.min_amount}
                  onChange={(e) =>
                    setAdForm({ ...adForm, min_amount: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Max Amount</Label>
                <Input
                  type="number"
                  value={adForm.max_amount}
                  onChange={(e) =>
                    setAdForm({ ...adForm, max_amount: e.target.value })
                  }
                />
              </div>
            </div>

            <Label>Available Amount</Label>
            <Input
              type="number"
              value={adForm.available_amount}
              onChange={(e) =>
                setAdForm({ ...adForm, available_amount: e.target.value })
              }
            />

            <Label>Payment Methods (comma separated)</Label>
            <Input
              value={adForm.payment_methods}
              onChange={(e) =>
                setAdForm({ ...adForm, payment_methods: e.target.value })
              }
              placeholder="Mpesa, Bank Transfer"
            />

            <Label>Terms (optional)</Label>
            <Input
              value={adForm.terms}
              onChange={(e) => setAdForm({ ...adForm, terms: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button onClick={handleCreateAd}>Create Ad</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Ad Modal (edit many fields) */}
      <Dialog open={showManageAd} onOpenChange={setShowManageAd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Advertisement</DialogTitle>
          </DialogHeader>

          {selectedAd && (
            <div className="space-y-3 py-2">
              <Label>Currency</Label>
              <div className="text-sm mb-2">
                {currencyMap.get(selectedAd.currency_id)?.code ??
                  selectedAd.currency_id}
              </div>

              <Label>Order Type</Label>
              <div className="mb-2">{selectedAd.order_type.toUpperCase()}</div>

              <Label>Price (USD)</Label>
              <Input
                type="number"
                value={selectedAd.price}
                onChange={(e) =>
                  setSelectedAd({
                    ...selectedAd,
                    price: Number(e.target.value),
                  })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Min Amount</Label>
                  <Input
                    type="number"
                    value={selectedAd.min_amount}
                    onChange={(e) =>
                      setSelectedAd({
                        ...selectedAd,
                        min_amount: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Max Amount</Label>
                  <Input
                    type="number"
                    value={selectedAd.max_amount}
                    onChange={(e) =>
                      setSelectedAd({
                        ...selectedAd,
                        max_amount: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <Label>Available Amount</Label>
              <Input
                type="number"
                value={selectedAd.available_amount}
                onChange={(e) =>
                  setSelectedAd({
                    ...selectedAd,
                    available_amount: Number(e.target.value),
                  })
                }
              />

              <Label>Payment Methods (comma separated)</Label>
              <Input
                value={selectedAd.payment_methods.join(", ")}
                onChange={(e) =>
                  setSelectedAd({
                    ...selectedAd,
                    payment_methods: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />

              <Label>Terms</Label>
              <Input
                value={selectedAd.terms ?? ""}
                onChange={(e) =>
                  setSelectedAd({ ...selectedAd, terms: e.target.value })
                }
              />

              <div className="flex gap-2 justify-end mt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleUpdateAd({
                      status:
                        selectedAd.status === "active" ? "paused" : "active",
                    })
                  }
                >
                  {selectedAd.status === "active" ? (
                    <>
                      <Pause className="w-4 h-4 mr-1" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" /> Resume
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    handleUpdateAd({
                      price: selectedAd.price,
                      min_amount: selectedAd.min_amount,
                      max_amount: selectedAd.max_amount,
                      available_amount: selectedAd.available_amount,
                      payment_methods: selectedAd.payment_methods,
                      terms: selectedAd.terms,
                    })
                  }
                >
                  <Pencil className="w-4 h-4 mr-1" /> Save
                </Button>

                <Button variant="destructive" onClick={handleDeleteAd}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdsAndCurrencies;
