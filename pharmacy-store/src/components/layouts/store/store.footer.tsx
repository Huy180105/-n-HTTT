import { Branding } from "@/components/custom/branding";
import { routes, siteConfig } from "@/config";
import { motion } from "framer-motion";
import { Award, Clock, Mail, MapPin, Phone, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export function StoreFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 text-white border-t border-slate-800/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Branding />
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed max-w-md text-sm font-medium">
              Nhà thuốc Pharmacity Store uy tín hàng đầu Việt Nam. Cung cấp các sản phẩm chăm sóc sức khỏe chính hãng 100% với đội ngũ dược sĩ tư vấn và trợ lý AI y khoa chuyên nghiệp.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                  <Mail className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <span className="text-slate-300 font-medium">support@pharmacity.vn</span>
              </div>
              <div className="flex items-center gap-3">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                  <Phone className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <span className="text-slate-300 font-medium">1800 6821 (Miễn phí 24/7)</span>
              </div>
              <div className="flex items-center gap-3">
                <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <span className="text-slate-300 font-medium">248A Nơ Trang Long, P.12, Q.Bình Thạnh, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.8 }}>
                  <Clock className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <span className="text-slate-300 font-medium">Mở cửa 24/7 (Phục vụ cả Lễ & Tết)</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-base font-bold mb-6 text-white uppercase tracking-wider text-cyan-400">Liên kết nhanh</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to={routes.store.root} className="text-slate-300 hover:text-cyan-400 transition-colors">Trang chủ</Link></li>
              <li><Link to={routes.store.categories} className="text-slate-300 hover:text-cyan-400 transition-colors">Danh mục thuốc</Link></li>
              <li><Link to={routes.store.consultation} className="text-slate-300 hover:text-cyan-400 transition-colors">Tư vấn AI y tế</Link></li>
              <li><Link to={routes.store.account.root} className="text-slate-300 hover:text-cyan-400 transition-colors">Tài khoản cá nhân</Link></li>
              <li><Link to={routes.store.account.cart} className="text-slate-300 hover:text-cyan-400 transition-colors">Giỏ hàng</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-bold mb-6 text-white uppercase tracking-wider text-cyan-400">Cam kết chất lượng</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="text-slate-300 flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-blue-400" />
                100% Thuốc chính hãng
              </li>
              <li className="text-slate-300 flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-cyan-400" />
                Giao hàng nhanh 2h
              </li>
              <li className="text-slate-300 flex items-center gap-2.5">
                <Award className="w-4 h-4 text-cyan-400" />
                Dược sĩ tư vấn chuyên nghiệp
              </li>
              <li className="text-slate-300 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                Hỗ trợ 24/7
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800/80 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-6">
              <span>Chuẩn GPP: 8821/BYT-HCM</span>
              <span>•</span>
              <Link to="/privacy" className="hover:text-cyan-400 transition-colors">Bảo mật</Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-cyan-400 transition-colors">Điều khoản</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}