import Foundation
import Vision
import CoreImage

let args = CommandLine.arguments
let inURL = URL(fileURLWithPath: args[1])
let outPrefix = args[2]
guard let ciImage = CIImage(contentsOf: inURL) else { fatalError("immagine non leggibile") }
let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])
guard let result = request.results?.first else { fatalError("nessun soggetto trovato") }
print("istanze:", result.allInstances.count)
let ctx = CIContext()
let cs = CGColorSpace(name: CGColorSpace.linearGray)!
for idx in result.allInstances {
    let buf = try result.generateScaledMaskForImage(forInstances: IndexSet(integer: idx), from: handler)
    let img = CIImage(cvPixelBuffer: buf)
    let out = URL(fileURLWithPath: "\(outPrefix)_\(idx).png")
    try ctx.writePNGRepresentation(of: img, to: out, format: .L8, colorSpace: cs)
    print("scritto", out.lastPathComponent)
}
