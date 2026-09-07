import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ArrowRight, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { StoreAPI, ReviewResponse } from "@/services/v1/store.api";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MedicineDetailReviewsProps {
  medicineId: string;
  star: number;
  reviewCount: number;
}

export function MedicineDetailReviews({ medicineId, star, reviewCount }: MedicineDetailReviewsProps) {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: reviews = [], isLoading } = useQuery<ReviewResponse[]>({
    queryKey: ["reviews", medicineId],
    queryFn: () => StoreAPI.FetchReviews(medicineId),
    enabled: !!medicineId,
  });

  const mutation = useMutation({
    mutationFn: StoreAPI.WriteReview,
    onSuccess: () => {
      toast.success("Da gui danh gia thanh cong!");
      setComment("");
      setSelectedRating(5);
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["reviews", medicineId] });
      queryClient.invalidateQueries({ queryKey: ["medicine", medicineId] });
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || "Gui danh gia that bai, vui long thu lai.");
    },
  });

  const handleSubmit = () => {
    if (!comment.trim() || comment.trim().length < 3) {
      toast.error("Noi dung danh gia phai co it nhat 3 ky tu.");
      return;
    }
    mutation.mutate({ medicine_id: medicineId, rating: selectedRating, comment: comment.trim() });
  };

  const displayReviews = reviews.length > 0 ? reviews : [];
  const totalReviews = reviews.length > 0 ? reviews.length : reviewCount;
  const avgStar = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-12"
    >
      <div className="p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/80 dark:to-slate-900/30 rounded-2xl shadow-lg border">
        <div className="prose prose-emerald dark:prose-invert max-w-none">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 mb-8 pb-2 border-b border-emerald-100 dark:border-emerald-900/50">
            Danh gia tu khach hang ({totalReviews})
          </h3>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Left: star summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="md:w-1/3 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center"
            >
              <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 mb-4">
                {avgStar.toFixed(1)}
              </div>
              <div className="flex justify-center mb-3 space-x-1">
                {[0, 1, 2, 3, 4].map((i) => {
                  const isFullStar = i < Math.floor(avgStar);
                  const isHalfStar = !isFullStar && i === Math.floor(avgStar) && (avgStar % 1) >= 0.5;
                  return (
                    <div key={i} className="relative inline-block h-7 w-7">
                      <Star
                        className={`h-7 w-7 ${isFullStar || isHalfStar ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        fill={isFullStar ? "currentColor" : "none"}
                      />
                      {isHalfStar && (
                        <div className="absolute inset-0 overflow-hidden w-[50%]">
                          <Star className="h-7 w-7 text-yellow-400 fill-yellow-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-muted-foreground mb-6">{totalReviews} danh gia</p>
              <div className="pt-6 border-t">
                <p className="text-sm text-center mb-4">Ban da dung san pham nay?</p>
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="w-full text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    onClick={() => setShowForm(v => !v)}
                  >
                    {showForm ? "Huy" : "Viet danh gia"}
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full text-sm opacity-60" disabled>
                    Dang nhap de danh gia
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Right: review list */}
            <div className="md:w-2/3">
              {/* Write review form */}
              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-emerald-100 dark:border-emerald-900/30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.profileImage?.url || ""} />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700">
                          {user?.firstname?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user?.firstname} {user?.lastname}</p>
                        <p className="text-xs text-muted-foreground">Danh gia cua ban</p>
                      </div>
                    </div>

                    {/* Star selector - half star support */}
                    <div className="flex items-center gap-1 mb-4">
                      <span className="text-sm text-muted-foreground mr-2">Chọn số sao:</span>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => {
                          const activeRating = hoveredRating || selectedRating;
                          // Full star: s <= floor(activeRating), Half: s - 0.5 == activeRating or (s-1 < activeRating < s)
                          const isFull = s <= Math.floor(activeRating);
                          const isHalf = !isFull && activeRating > s - 1 && activeRating < s;
                          return (
                            <div
                              key={s}
                              className="relative h-8 w-8 cursor-pointer"
                              onMouseLeave={() => setHoveredRating(0)}
                            >
                              {/* Base empty star */}
                              <Star className="absolute inset-0 h-8 w-8 text-gray-300 dark:text-gray-600" />

                              {/* Filled overlay - full or half */}
                              {(isFull || isHalf) && (
                                <div className={`absolute inset-0 overflow-hidden ${isHalf ? "w-1/2" : "w-full"}`}>
                                  <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                                </div>
                              )}

                              {/* Left half zone → half star (s - 0.5) */}
                              <div
                                className="absolute inset-y-0 left-0 w-1/2"
                                onMouseEnter={() => setHoveredRating(s - 0.5)}
                                onClick={() => setSelectedRating(s - 0.5)}
                              />
                              {/* Right half zone → full star (s) */}
                              <div
                                className="absolute inset-y-0 right-0 w-1/2"
                                onMouseEnter={() => setHoveredRating(s)}
                                onClick={() => setSelectedRating(s)}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <span className="ml-2 text-sm font-semibold text-emerald-600">
                        {(hoveredRating || selectedRating).toFixed(1)} sao
                      </span>
                    </div>

                    {/* Comment box */}
                    <Textarea
                      placeholder="Chia se cam nhan cua ban ve san pham nay... (toi thieu 3 ky tu)"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="mb-4 resize-none focus:border-emerald-400 dark:focus:border-emerald-500"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{comment.length}/1000 ky tu</span>
                      <Button
                        onClick={handleSubmit}
                        disabled={mutation.isPending || !comment.trim() || comment.trim().length < 3}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                      >
                        {mutation.isPending ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Dang gui...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Gui danh gia
                          </span>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reviews list */}
              <div className="space-y-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                    <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mr-2" />
                    Dang tai danh gia...
                  </div>
                ) : displayReviews.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Chua co danh gia nao.</p>
                    <p className="text-sm mt-1">Hay la nguoi dau tien danh gia san pham nay!</p>
                  </div>
                ) : (
                  displayReviews.map((review, index) => (
                    <motion.div
                      key={review.id || review._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 mr-4 ring-2 ring-emerald-100 dark:ring-emerald-900/30">
                          <AvatarImage src={review.user?.profile_image?.url || ""} />
                          <AvatarFallback className="bg-emerald-100 text-emerald-700">
                            {review.user?.firstname?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-lg">
                            {review.user ? `${review.user.firstname} ${review.user.lastname}` : "Khach hang"}
                          </h4>
                          <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              {new Date(review.created_at).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </motion.div>
                  ))
                )}
              </div>

              {displayReviews.length > 0 && (
                <Button variant="outline" className="mt-8 bg-white dark:bg-slate-800 shadow-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                  Xem tat ca danh gia <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
